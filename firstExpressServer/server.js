//sanity check
console.log("--------------------------------------");
console.log("Assignment 2> server.js");
console.log("--------------------------------------");

// --------------------------
//imports
//---------------------------
const app = require('./controller/app');

// --------------------------
//configurations
//---------------------------
const hostname = "localhost";
const port = 8000;




// --------------------------
//main
//---------------------------


//standard for express
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});