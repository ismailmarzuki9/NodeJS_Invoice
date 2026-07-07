// const { Sequelize } = require("sequelize");\
require('dotenv').config();

let db;

if(process.env.DB_TYPE === 'mysql'){
    const mysql = require('mysql2/promise');

    db =mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
} else {
    const { Pool } = require('pg');

    db = new Pool ({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
    
}

// console.log(process.env.DB_TYPE);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_NAME);
// console.log("DATABASE.JS DIPANGGIL");

module.exports = db;
