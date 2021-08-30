const mysql = require('mysql2');
require('dotenv').config();

//connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: VOLchenok*8,
        database: "employee_tracker",
    }, 
    console.log('Connected to employee_tracker database.')
);

module.exports = db;