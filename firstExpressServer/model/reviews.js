console.log("---------------------------------------------------------");
console.log("Assignment 2> model >reviews.js");
console.log("---------------------------------------------------------");



var db = require('../controller/databaseConfig');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var reviewDB = {
    getReviewWithGameId: function (gameid, callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = `SELECT
                reviews.gameid,
                reviews.content,
                reviews.rating,
                user.username,
                reviews.created_at
                FROM assignment1.reviews reviews
                CROSS JOIN
                assignment1.user user
                ON
                reviews.userid=user.userid
                WHERE
                 gameid=?`;

                conn.query(sql, [gameid], function (err, result) {

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


    // Assignment 2 add review
    addReview: function (gameid, content, rating, userid, callback) {
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
                INSERT INTO
                assignment1.reviews (
                    gameid,
                     content,
                      rating,
                      userid )
                VALUES
                (
                ?,
                ?,
                  ?,
                  ?
                  );
                `;

                conn.query(sql, [gameid, content, rating, userid], function (err, result) {

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
module.exports = reviewDB;


/**
 *
 *
 * Ther are many people, in the cinemas right now.
 *
 *
 */