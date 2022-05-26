// ----------------------------------------------------------------------------
// imports
// ----------------------------------------------------------------------------
var jwt = require('jsonwebtoken');

var config = require('../config');
// ----------------------------------------------------------------------------
// objects/function
// ----------------------------------------------------------------------------
function verifyToken(req, res, next) {
    console.log(req.headers);
    //retrieve authorization header’s content
    // Authorization: Bearer <token>
    var token = req.headers['authorization'];
    //Bearer <token>
    console.log(token);


    //process the token
    if (!token || !token.includes('Bearer')) {

        // res.status(403);
        return res.status(403).send({
            auth: 'false',
            message: 'Not authorized!'
        });
    } else {
        //obtain the token’s value
        token = token.split('Bearer ')[1];
        /*

         token.split('Bearer ')
         ="Bearer <token>".split('Bearer ')
          |------| |----|
             |        |------------------|
             |       |-------------|     |
    you get back an array:         |     |
    [                                    |
    "Bearer ",----------------------|    | [0]
    "<token>"----------------------------| [1]
]

        */
        console.log(token);

        jwt.verify(token, config.key, function (err, decoded) {//verify token
            if (err) {
                // res.status(403);
                var errorMsg={
                     auth: false, //  <---------------------------|
                     message: 'Not authorized!!!!!!!!!' //--------|
                                                  
                    };
                   
                return res.type('json').status(403).end(JSON.stringify(errorMsg));
            } else {
                //decode the userid and store in req for use
                req.userid = decoded.userid;
                //decode the role and store in req for use
                req.type = decoded.type;
                next();
            }

        });
    }

}

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = verifyToken;



