const mysql = require('mysql2');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
     
      password: 'VOLchenok*8',
      database: 'employees'
    },
    console.log('Success!')
);

module.exports = db;