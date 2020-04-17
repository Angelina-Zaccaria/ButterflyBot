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

//Table Created for Bad Words
// config.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE BadWords (word VARCHAR(255))";
//     config.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

//Table created for Users
// config.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE Users (id VARCHAR(255), name VARCHAR(255), starcount VARCHAR(255))";
//     config.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

//Add Teacher Column for Table Users
// config.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "ALTER TABLE Users ADD COLUMN isTeacher VARCHAR(255)";
//     config.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table altered");
//     });
//   });