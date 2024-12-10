const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "sql", //add your password
    database: "WAD24_Team-B_HW4",
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

const createPostsTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(100) NOT NULL,
        body VARCHAR(1000) NOT NULL,
        time TIMESTAMP NOT NULL,
        userid INTEGER NOT NULL
    );`;

execute(createPostsTblQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;