//Build the process.env object

require('dotenv').config();

module.exports = {
  databaseUserName: process.env.USER,
  databasePassword: process.env.PASSWORD,
  databaseName: process.env.DATABASE,
  databaseHost: process.env.HOST,


};