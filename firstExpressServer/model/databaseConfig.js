console.log("---------------------------------------------------------");
console.log("Assignment2> controller >databaseConfig.js");
console.log("---------------------------------------------------------");

// ---------------------------------------
// imports
// ---------------------------------------
var mysql = require('mysql');

// ---------------------------------------
// object / functions
// ---------------------------------------

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "akinom1811",
            database: "babies_record"
        });    

        return conn;
    }
};

// ---------------------------------------
// exports
// ---------------------------------------
module.exports = dbconnect;
