console.log("---------------------------------------------------------");
console.log("Assignment 2> model >babies.js");
console.log("---------------------------------------------------------");



var db = require('./databaseConfig');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var BabiesDB = {



    getBabies: function (callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM babies_record.baby; ;';

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


    getBaby: function (id, callback) {
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
                    `SELECT * FROM babies_record.baby where id =?;`;

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



    deleteBaby: function (id, callback) {
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
                DELETE 
                FROM
               baby
                WHERE
                id = ?;`
                    ;

                conn.query(sql, [id], function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {
                        // any results
                        if (result.length == 0) {
                            // if there is no result, let's callback with
                            //no error, and no results
                            return callback(null, null);
                        }
                        else {
                            // since there is a size to it, it must be that
                            // there is only one record left
                            // let's return  the only onr founf(result[0])
                            return callback(null, result[0]);
                        }

                    }
                });
            }
        });
    },


    //  Assignment 2
    addBaby: function (name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, callback) {
        // geta connection to the database
    
        var conn = db.getConnection();

        conn.connect(
            function (err) {

          
                var sql = `INSERT INTO
    baby (
       name,
       height_six_month,
       height_seven_month, 
       height_eight_month, 
       height_nine_month,
       height_ten_month)
VALUES
(
?,
?,
?,
?,
?,
?
);
    `;

    
                conn.query(sql, [name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month], function (err, result) {


                    if (err) {

                        console.log(err.code);
                        return callback(err);
                        // return callback(null, result);
                    } else {
                        return callback(null, result);

                    }
                    // conn.end();
                    // return callback(null, result);
                });


        });
    
    },




    updateBaby: function (name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, id, callback) {
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
                baby
             SET
                name=?,
                height_six_month=?,
                height_seven_month=?,
                 height_eight_month=?,
                  height_nine_month=?,
                   height_ten_month=?
            where
                 id=?
                 ;
                

                `;

                conn.query(sql, [name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, id], function (err, result) {

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
    }



};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = BabiesDB;


/**
 * 
 * 
 * Ther are many people, in the cinemas right now.
 * 
 * 
 */