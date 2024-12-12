const Pool = require('pg').Pool;

/*
To run the server, the machine MUST:
- have installed PostgreSQL
- have PostgreSQL user "wad" with password "wad24" (does not need any extra rights)
- have a SQL database "WAD24_Team-B" with owner "wad"
*/

const pool = new Pool({
    user: "wad",
    password: "wad24", 
    database: "WAD24_Team-B",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createUsersTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createUsersTblQuery).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});


const dropTblQuery = `
DROP TABLE IF EXISTS posts;
`;

execute(dropTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is droped');
    }
});



const createPostsTblQuery = `
    CREATE TABLE "posts" (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(100) NOT NULL,
        text VARCHAR(1000) NOT NULL,
        time TIMESTAMP NOT NULL,
        likes INTEGER NOT NULL,
        userid INTEGER NOT NULL
    );`;

execute(createPostsTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;