console.log("---------------------------------------------------------");
console.log("Assignment 2> model >coursemodule.js");
console.log("---------------------------------------------------------");



var db = require('./databaseConfig');
var config =require('../config');
var jwt=require('jsonwebtoken');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var userDB = {
// Assignment2 login
    loginUser: function (email, password, callback) {

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select * from user where email=? and password=?';

                conn.query(sql, [email, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err, null,null);

                    } else {
                        // no result at all
                       if(result.length==0){
                           console.log("errorrrrrrrrrrrrrr")
                           return callback(null,null,null);

                       }
                       else{
                           // it must be that we have ONE result here,
                        //    since the email is unique hence in the result array we choose the first guy

                        // confirm if we have key
                        console.log("Secrete Key: "+config.key)
                       console.log(result[0])
                        // generate token

                        var token=jwt.sign(
                            // (1)PayLoad
                            {
                                userid:result[0].userid,
                                type:result[0].type
                            },
                            // (2)Secrete Key
                            config.key,
                            // (3) Lifetime of Token
                            {
                                //expires in 24 hrs
                            expiresIn:86400
                        });;
                      

                        return callback(null, token,result)



                       }

                     

                    }

                });


            }

        });
    },


    getUser: function (id, callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql =
                    `SELECT
                 * 
                 FROM 
                 assignment1.user 
                 WHERE 
                 userid = ?`;

                conn.query(sql, [id], function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },



    getUsers: function (callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT  userid,username,email,type,profile_pic_url, created_at FROM user ORDER BY username;';

                conn.query(sql, [], function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },


    addUser: function (username,email,type,password,profile_pic_url, callback) {
     
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = `INSERT INTO
                         assignment1.user (
                    username,
                    email,
                    type,
                    password,
                     profile_pic_url)
                VALUES
                (
                  ?,
                  ?,
                  ?,
                  ?,
                  ?
                  );
                `;

                conn.query(sql, [username, email, type,password, profile_pic_url], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err.null);
                    } else {
                        console.log(result)
                        return callback(null, result);
                    }
                });
            }
        });
    },



    
    updateUser: function (userid, username, email, type, password, callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = `
            UPDATE 
                assignment1.user
             SET
                username=?,
                email=?,
                type=?,
                password=?
             WHERE
                 userid=?;
                `;

                conn.query(sql, [username, email, type, password, userid], function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },




};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = userDB;


/**
 *
 *
 * Ther are many people, in the cinemas right now.
 *
 *
 */