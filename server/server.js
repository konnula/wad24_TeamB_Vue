const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret 
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


/** 
 * 
 * Handling HTTP request for table "users"
 * 
 */ 

// Authentication request

app.get('/auth/authenticate', async(req, res) => {
    console.log('AUTH request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('Author is authenticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authenticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// User signup request

app.post('/auth/signup', async(req, res) => {
    try {
        console.log("SIGNUP request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const username = email.split("@")[0];
        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt
        
        const emailInUse = await pool.query(
            "SELECT username FROM users WHERE email = $1", [email]
        ).length;
        if (emailInUse) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, username, password) values ($1, $2, $3) RETURNING*", [email, username, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        console.log("JWT token: " + token);
        res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// User login request

app.post('/auth/login', async(req, res) => {
    try {
        console.log("LOGIN request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// User logout request - deletes the jwt

app.get('/auth/logout', (req, res) => {
    console.log('LOGOUT (delete jwt) request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

// Handling Users GET (all) requests - for debugging
app.get('/auth/users', async(req, res) => {
    try {
        console.log("Users GET (all) request has arrived");
        const posts = await pool.query(
            "SELECT * FROM users ORDER BY id"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});


/**
 *
 *  Handling HTTP request for table "posts" 
 * 
 */ 

// Handling Posts POST request
app.post('/api/posts', async(req, res) => {
    try {
        console.log("Posts POST request has arrived");
        const post = req.body;

        // Ensure the request contains all required fields
        if (!post.userid || !post.title || !post.body) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newpost = await pool.query(
            "INSERT INTO posts(title, text, time, userid, likes) values ($1, $2, localtimestamp, $3, 0) RETURNING*", [post.title, post.body, post.userid]
        );
        res.status(201).json({id: newpost.rows[0].id, userid: newpost.rows[0].userid, title: newpost.rows[0].title, body: newpost.rows[0].body});
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handling Posts GET (all) requests
app.get('/api/posts', async(req, res) => {
    try {
        console.log("Posts GET (all) request has arrived");
        const posts = await pool.query(
            //"SELECT * FROM posts ORDER BY time DESC"
            "SELECT posts.id, title, text, time, userid, likes, COALESCE(users.username, 'Deleted User') AS author FROM posts LEFT JOIN users ON posts.userid = users.id ORDER BY time DESC"
        );
        res.status(200).json(posts.rows);
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handling Posts GET (one post) requests
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("Posts GET (one post) request has arrived");
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( 
            //"SELECT * FROM posts WHERE id = $1", [id]
            "SELECT posts.id, title, text, time, userid FROM posts WHERE posts.id = $1", [id]
        );
        res.status(200).json(posts.rows[0]);  // we already know that the row array contains a single element, and here we are trying to access it
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handling Posts PUT requests
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("Posts PUT request has arrived");
        const updatepost = await pool.query(
            "UPDATE posts SET (title, text, time, userid) = ($2, $3, localtimestamp, $4) WHERE id = $1", [id, post.title, post.text, post.userid]
        );
        res.status(200).json(updatepost);
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handling Posts Increase Like requests
app.put('/api/posts/like/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Posts Increase like request has arrived, post id: " + id);
        const updatepost = await pool.query(
            "UPDATE posts SET likes = (SELECT likes FROM posts WHERE id = $1)+1 WHERE id = $1", [id]
        );
        res.status(200).json(updatepost);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});

// Handling Posts Reset Likes requests
app.put('/api/resetlikes', async(req, res) => {
    try {
        console.log("Posts Reset Likes request has arrived")
        const update = await pool.query(
            "UPDATE posts SET likes = 0"
        );
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});

// Handling Posts DELETE request
app.delete('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Posts DELETE (one post) request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM Posts WHERE id = $1", [id]
        );
        res.status(200).json(deletepost);
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}); 

// Handling Posts DELETE (all) request
app.delete('/api/posts', async(req, res) => {
    try {
        //const { id } = req.params;
        console.log("Posts DELETE (all) request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM Posts"
        );
        res.status(200).json(deletepost);
    } catch (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
    }
}); 