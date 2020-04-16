const mysql = require('mysql');

//Set database connection credentials
const config = mysql.createConnection({
    host: '162.243.235.211',
    user: 'user345',
    password: 'Password1@',
    database: 'db345',
});

//Create a MySQL pool
const pool = mysql.createPool(config);

//Export the pool
module.exports = pool;

config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE BadWords (word VARCHAR(255))";
    config.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});