console.log("---------------------------------------------------------");
console.log("Assignment2> controller >databaseConfig.js");
console.log("---------------------------------------------------------");
const {databaseUserName, databaseHost, database, databasePassword} = require('../dbConfig')


// ---------------------------------------
// imports
// ---------------------------------------


// ---------------------------------------
// object / functions
// ---------------------------------------
const mysql =require("mysql");

const config=(
    {
        user :databaseUserName,
        password:databasePassword,
        host:databaseHost,
        database:database
    }
 );

 var pool= new mysql.createPool(config)

// ---------------------------------------
// exports
// ---------------------------------------
module.exports = pool;
