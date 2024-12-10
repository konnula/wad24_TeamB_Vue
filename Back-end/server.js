const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
app.use(express.json());
app.use(cookieParser());


// Handling HTTP request for table "Posts"

// Handling Posts POST request
app.post('/api/posts/', async(req, res) => {
    try {
        console.log("Posts POST request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posts(title, body, time, userid) values ($1, $2, localtimestamp, $3)    RETURNING*", [post.title, post.body, post.userid]
        );
        res.json(newpost);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});

// Handling Posts GET (all) requests
app.get('/api/posts', async(req, res) => {
    try {
        console.log("Posts GET (all) request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts ORDER BY time DESC"
            //"SELECT til FROM posts JOIN users ON posts.userid = users.id ORDER BY time DESC"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});

// Handling Posts GET (one post) requests
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("Posts GET (one post) request has arrived");
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query( 
            "SELECT * FROM posts WHERE id = $1", [id]
            //"SELECT * FROM posts JOIN users ON posts.userid = users.id WHERE id = $1", [id]
        );
        res.json(posts.rows[0]);  // we already know that the row array contains a single element, and here we are trying to access it
    } catch (err) {
        console.error("Database error: " + err.message);
    }
});

// Handling Posts PUT requests
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("Posts PUT request has arrived");
        const updatepost = await pool.query(
            "UPDATE posts SET (title, body, time, userid) = ($2, $3, localtimestamp, $4) WHERE id = $1", [id, post.title, post.body, post.userid]
        );
        res.json(updatepost);
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
        res.json(deletepost);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
}); 

// Handling Posts DELETE (all) request
app.delete('/api/posts', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("Posts DELETE (all) request has arrived");
        const deletepost = await pool.query(
            "DELETE FROM Posts"
        );
        res.json(deletepost);
    } catch (err) {
        console.error("Database error: " + err.message);
    }
}); 


// TODO: Handling HTTP request for table "Users"

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});