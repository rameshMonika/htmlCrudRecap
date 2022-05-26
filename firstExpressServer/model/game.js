console.log("---------------------------------------------------------");
console.log("Assignment 2> model >game.js");
console.log("---------------------------------------------------------");



var db = require('./databaseConfig');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var gameDB= {

    getGameByTitle: function (title, callback) {
        // var title=title.title;
        console.log(title)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
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
               assignment1.game
              
              WHERE
                  title LIKE concat ('%',?,'%');
                
                `

                conn.query(sql, [title], function (err, result) {
                    
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

   
    getGameByPlatform: function (platform, callback) {
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
                from assignment1.game
                WHERE
                platform = ?
                
                `

                conn.query(sql, [platform], function (err, result) {
                    
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
    getGameByPrice: function (price, callback) {
        // var title=title.title;
        console.log(price)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = 
                `SELECT * FROM 
                assignment1.game
                WHERE price BETWEEN 0 AND ?+1;;
                
                `

                conn.query(sql, [price], function (err, result) {
                    
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

   
    //  Assignment 2
    addGame: function (title,description,price,platform,categoryid,year,callback) {
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
                         game (
                            title,
                            description,
                            price, 
                            platform, 
                            categoryid,
                            year)
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

                conn.query(sql, [title, description, price, platform, categoryid,year], function (err, result) {
                    
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
    
    findGameAllReq: function (platform,price,title, callback) {
        // var title=title.title;
        console.log(platform)
        console.log(price)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
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
                    
                      assignment1.game
      
                   
                      WHERE
                      platform = ? and price BETWEEN 0 AND ?+1 and title LIKE concat ('%',?,'%'); ;
    
                
                `

                conn.query(sql, [platform,price,title], function (err, result) {
                    
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

    findGameWOPlat: function (price,title, callback) {
        // var title=title.title;
        console.log(price)
        console.log(title)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
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
                    
                      assignment1.game
      
                   
                      WHERE
                      price BETWEEN 0 AND ?+1 and title LIKE concat ('%',?,'%'); ;
    
                
                `

                conn.query(sql, [price,title], function (err, result) {
                    
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

       
    findGameWOPrice: function (platform,title, callback) {
        // var title=title.title;
        console.log(platform)
        console.log(title)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
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
                    
                      assignment1.game
      
                   
                      WHERE
                      platform = ? and title LIKE concat ('%',?,'%'); ;
    
                
                `

                conn.query(sql, [platform,title], function (err, result) {
                    
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
  
    findGameWOTitle: function (platform,price,callback) {
        // var title=title.title;
        console.log(platform)
        console.log(price)
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err,result) {
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
                    
                      assignment1.game
      
                   
                      WHERE
                      platform = ? and price BETWEEN 0 AND ?+1  ;
    
                
                `

                conn.query(sql, [platform,price], function (err, result) {
                    
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



    
    deleteGame: function (gameid, callback) {
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
               game
                WHERE
                gameid = ?;`
                 ;

                conn.query(sql, [gameid], function (err, result) {
                    
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err.null);
                    } else {
                        // any results
                        if(result.length ==0)
                        {
                            // if there is no result, let's callback with
                            //no error, and no results
                            return callback(null,null);
                        }
                        else
                        {
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

    getGame: function (id, callback) {
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
                 game
                 WHERE 
                 gameid = ?`;

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

    getGames: function (callback) {
        // geta connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err.null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM assignment1.game; ;';

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




     
    updateGame: function (title,description,price,platform,categoryid,year,gameid,callback) {
                           
  
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
                assignment1.game
             SET
             title=?,
             description=?,
             price=?,
             platform=?,
             categoryid=?,
             year=?
             WHERE
                 gameid=?;
                `;

                conn.query(sql, [title,description,price,platform,categoryid,year,gameid], function (err, result) {
                    
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
module.exports = gameDB;


/**
 * 
 * 
 * Ther are many people, in the cinemas right now.
 * 
 * 
 */