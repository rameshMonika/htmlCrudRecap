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
            try {
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
            catch (err) {
                console.log(err);
                return callback(err.null);

            }


        });




    },


    getBaby: function (id, callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {


            try {
                console.log("Connected!");

                var sql =
                    `SELECT * FROM babies_record.baby where id =?;`;

                conn.query(sql, [id], function (err, result) {

                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {

                        if (result[0] == undefined) {
                            err = "undefined"
                            return callback(null, err);
                        }
                        else {
                            console.log(result)
                            return callback(null, result);
                        }

                    }
                });

            }
            catch (err) {
                console.log(err);
                return callback(err.null);

            }

        });
    },



    deleteBaby: function (id, callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {


            try {
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
                    

                    if(result.affectedRows==0){
                        err = "not found"
                        return callback(null, err);

                    }
                    else{
                        console.log(result)
                        return callback(null, result);

                    }
                      

                    
                });

            }
            catch (err) {
                console.log(err);
                return callback(err.null);

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
                        console.log("~~~~~~~~~~~~~~~~~errorcode~~~~~~~~~~~~");
                        console.log(err.code);

                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~")
                        return callback(null, result);
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
                        console.log("+++++++++++++++")
                        console.log(err);
                        return callback(null, err);
                    } else {

                        if (result.affectedRows == 0) {
                            err = "not found"
                            return callback(null, err);
                        }
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