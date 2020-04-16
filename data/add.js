
const mysql = require('mysql');

//Set database connection credentials
const config = mysql.createConnection({
    host: '162.243.235.211',
    user: 'user345',
    password: 'Password1@',
    database: 'db345',
});

// config.connect(function (err){
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO BadWords (word) VALUES ?";
//     var values = [
//         ['shit'],
//         ['dumb'],
//         ['idiot'],
//         ['stupid'],
//         ['bitch'],
//         ['fuck'],
//         ['damn'],
//         ['crap'],
//         [' ass'], 
//         ['asshole'],
//         ['asshat'],
//     ];
//     config.query(sql, [values], function(err, result){
//         if (err) throw err;
//         console.log("Number of records inserted: " + result.affectedRows);
//     });
// });