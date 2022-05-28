console.log("---------------------------------------------------------");
console.log("Assignment 2> model >category.js");
console.log("---------------------------------------------------------");



var db = require('../controller/databaseConfig');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var catDB= {


    
    getCategories: function (callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM assignment1.category ;';

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





    // Assignment2 add category
    addCategory: function (catname,callback) {
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
                         assignment1.category
                          (
                    catname
                    )
                VALUES
                (
                  ?
                  );
                `;

                conn.query(sql, [catname], function (err, result) {
                    
                    conn.end();
                    if (err) {
                        console.log(err);
                        
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    
    
    updateCategory: function (catname, description,categoryid,callback) {
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
                assignment1.category
             SET
                catname=?,
                description=?
                
             WHERE
                 categoryid=?
                 ;

                `;

                conn.query(sql, [catname, description,categoryid], function (err, result) {
                    
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
module.exports = catDB;


/**
 * 
 * 
 * Ther are many people, in the cinemas right now.
 * 
 * 
 */