const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'memeapp', // MYSQL DB NAME
    port: 3308,
}).promise();
module.exports = dbConnection;