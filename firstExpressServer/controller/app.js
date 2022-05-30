console.log("---------------------------------------------------------");
console.log("Assignment2> controller >app.js");
console.log("---------------------------------------------------------");

//-------------------------------------------------------------------------
//imports
//-------------------------------------------------------------------------
const express = require('express');

//Create an instance of express
const app = express();

const bodyParser = require('body-parser');

var user = require('../model/user');

var category = require('../model/category')

var game = require('../model/game')

var review = require('../model/reviews')

var babies = require('../model/babies')

var cors = require("cors");

var verifyToken = require('../auth/verifyToken.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

//-------------------------------------------------------------------------
// Middleware functions
//-------------------------------------------------------------------------

/** 
 * @param {object} req 
 *  request object
 * @param {object} res  
 *  response object 
 * @param {function} 
 *  reference to the enxt function to call
 * 
 */


function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[Debug Info]----------");
    //console.log(`Servicing ${urlPattern}...`);
    console.log("Servicing" + req.url + " ..");

    console.log("> req.params:" + JSON.stringify(req.params));
    console.log("> req.body:" + JSON.stringify(req.body));
    // console.log("> req.myOwnDebugIssue:"+JSON.stringify(req.myOwnDebugInfo));
    console.log("-----------------[Debug Info Ends]----------");
    console.log();

    next();

}

// from bodyParser, we want to get 2 different kinds of parsers
// who are capable of parsing some kind of data coming in
// 1.URL Encoded Parser
// 2.JSON Parser
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//-------------------------------------------------------------------------
// MF configurations
//-------------------------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);
app.options('*', cors());
app.use(cors());



//-------------------------------------------------------------------------
//endpoints
//------------------------------------------------------------------------


// get babies

app.get('/babies', printDebugInfo, async (req, res) => {

   
        babies.getBabies(function (err, result) {
            if (!err) {
            console.log("==================================")
            console.log("get babies work")
            console.log("==================================")
            res.status(200).send(result);
            }
            else {
                res.status(500).send("Some error");
            }
        });

  

});



// get a baby

app.get('/babies/:id', printDebugInfo, async (req, res) => {
    var babyid = req.params.id;

    // try {
        babies.getBaby(babyid, function (err, result) {

            if(!err){
                if (result.length == 0) {
                    output = {
                        "Error": "Id not found"
                    };
                    res.status(404).send(output);
    
                }
                else {
                    res.status(200).send(result);
    
                }


            }
            else{
                    output = {
            "Error": "Internal sever issues"
        };
        res.status(500).send(output);

            }

        



        });

   



});


// delete baby
app.delete('/babies/:id', printDebugInfo, function (req, res) {
    var babyid = req.params.id;


    babies.deleteBaby(babyid, function (err, result) {

        if (!err) {

            if (result.affectedRows == 0) {

                res.status(404).send("Item cannot be deleted");
                

            }
            else {
                res.status(200).send(result);

            }



        }
        else {
            output = {
                "Error": "Internal sever issues"
            };
            res.status(500).send(output);
        }



    });





});



// add baby detail
app.post('/baby', printDebugInfo, function (req, res) {
    var name = req.body.name;
    var height_six_month = req.body.height_six_month;
    var height_seven_month = req.body.height_seven_month;
    var height_eight_month = req.body.height_eight_month;  // to extract data
    var height_nine_month = req.body.height_nine_month;
    var height_ten_month = req.body.height_ten_month;

    console.log("Name to be added : " + name)


    babies.addBaby(name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, function (err, result) {

        if (!err) {
            res.status(201).send(result)
        }
        else {

            if (err.code == "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
                res.status(406).send("Inappropriate value")

            }

            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send("Null value not allowed")

            }
            else {
                res.status(500).send("Internal Server Error")

            }

        }


    });

}



);



// update baby details
app.put('/baby/:id', printDebugInfo, function (req, res) {
    var babyid = req.params.id;
    var name = req.body.name;
    var height_six_month = req.body.height_six_month;
    var height_seven_month = req.body.height_seven_month;
    var height_eight_month = req.body.height_eight_month;  // to extract data
    var height_nine_month = req.body.height_nine_month;
    var height_ten_month = req.body.height_ten_month;

    console.log("Name to be added : " + name)

    // try {
    babies.updateBaby(name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, babyid, function (err, result) {

        if (!err) {
            var output = {
                "babyid": result.insertId
            }

            console.log("result comd" + output.babyid)


            res.status(201).send(result);

        }
        else {
            if (err.code == "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
                res.status(406).send("Inappropriate value")

            }

            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send("Null value not allowed")

            }
            else {
                res.status(500).send("Internal Server Error")

            }

        }



    });

    // }
    // catch (err) {
    //     output = {
    //         "Error": "Internal sever issues"
    //     };
    //     res.status(500).send(output);

    // }


});



app.get('/babiesPage/:pageNumber', printDebugInfo, async (req, res) => {
    var pageNumber = req.params.pageNumber;

    // try {
        babies.PageBaby(pageNumber, function (err, result) {

            if(!err){
                
                    res.status(200).send(result);
    
             

            }
            else{
                    output = {
            "Error": "Internal sever issues"
        };
        res.status(500).send(output);

            }

        



        });

   



});







// assignment 2 LOGIN
app.post('/login', printDebugInfo, function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, token, result) {
        if (err) {

            // this is matched to callback(not null,null)
            res.status(500);
            res.send(err.statusCode);
        } else {

            if (!result) {
                // this is matched to callback(null, null)
                var message = { "Error": "Invalid Login" };
                res.status(404).send(message);
            }
            else {
                // this is matched to callback(null,not null)
                console.log("Token: " + token);
                var message = {
                    "UserData": JSON.stringify(result),
                    "token": token
                };
                res.status(200).send(message);

            }

        }

    });


});




// assignment 2 ADD REVIEW
// you have added the token check here. 

app.post('/user/:uid/game/:gid/review/', printDebugInfo, verifyToken, function (req, res) {
    var userid = req.params.uid;
    var gameid = req.params.gid;
    var content = req.body.content;
    var rating = req.body.rating;
    var type = req.type;

    if (type != "Customer") {
        output = {
            "Error": "You are not a customer"
        }
        res.status(401).send(output);

    }
    else {
        review.addReview(gameid, content, rating, userid, function (err, result) {
            if (!err) {


                output = {
                    "reviewId": result.insertId,
                    "content": content,

                };
                res.status(201).send(output);



            } else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }

});



// Assignment 2 ADD GAME
app.post('/game', printDebugInfo, verifyToken, function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var platform = req.body.platform;  // to extract data
    var categoryid = req.body.categoryid;
    var year = req.body.year;
    var type = req.type;
    if (type != "admin") {
        output = {
            "Error": "You are not an admin"
        }
        res.status(403).send(output);
    }
    else {
        game.addGame(title, description, price, platform, categoryid, year, function (err, result) {
            if (!err) {
                console.log("-------Type of user--------");
                console.log(type);
                console.log("-------Type of user--------");


                output = {
                    "gameid": result.insertId
                }
                res.status(201).send(output);



            } else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }

});


// Assignment 2 ADD CATEGORY
app.post('/category', printDebugInfo, verifyToken, function (req, res) {
    // store catname typed in postman
    var catname = req.body.catName;
    // store description typed in postman
    // var description = req.body.description;
    // call addCategory method in category.js
    console.log("-------add cat")
    console.log(catname)
    var type = req.type;
    console.log("++++++++")
    console.log(type)
    if (type != "admin") {
        output = {
            "Error": "You are not an admin"
        }
        res.status(401).send(output);

    }
    else {
        category.addCategory(catname, function (err, result) {
            // if there is no error send result
            console.log(catname)
            if (!err) {
                console.log("-------Type of user add cat--------");
                console.log(catname);
                console.log("-------Type of user--------");

                output = {
                    "Category Name": catname
                }

                res.status(201).send(output);


            }
            // else prompts error
            else {
                // if error is namr already exist
                if (err.code == "ER_DUP_ENTRY") {
                    output = {
                        "Error": "The category name provided already exists."
                    };
                    res.status(422).send(output);
                }
                else
                // else internal server issues
                {
                    output = {
                        "Error": "Internal sever issues"
                    };
                    res.status(500).send(output);

                }
            }
        });

    }

});



// Assignment 2 find game all type filter
app.post('/gameFind/', printDebugInfo, function (req, res) {

    var platform = req.body.platform;
    var price = req.body.price;
    var title = req.body.title;

    if (platform == "" && price == "" && title == "") {
        game.getGames(function (err, result) {
            // if there is no error sends result
            if (!err) {
                res.status(200).send(result);
            }
            // else shows error
            else {
                output = {
                    "Unknown Error": "Internal Server Error"
                };

                res.status(500).send(output);
            }
        });


    }
    else if (platform != "" && price == "" && title == "") {
        game.getGameByPlatform(platform, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }
    else if (platform == "" && price != "" && title == "") {
        game.getGameByPrice(price, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }
    else if (platform == "" && price == "" && title != "") {
        game.getGameByTitle(title, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }

    else if (platform == "") {

        // price = req.body.price;
        // title = req.body.title;

        game.findGameWOPlat(price, title, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }
    else if (platform != "" && price == "" && title != "") {

        // platform = req.body.platform;
        // title = req.body.title;

        game.findGameWOPrice(platform, title, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });

    }
    else if (title = "") {

        game.findGameWOTitle(platform, price, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });


    }
    else if (platform != "" && price != "" && title != "") {

        platform = req.body.platform;
        price = req.body.price;
        title = req.body.title;

        game.findGameAllReq(platform, price, title, function (err, result) {
            if (!err) {
                res.send(result);
            }
            else {
                output = {
                    "Error": "Internal sever issues"
                };
                res.status(500).send(output);
            }
        });


    }





});


// Assignment 2 find game all type filter
app.get('/games/Maxprice/:price/titlename/:title/platform/:platform', printDebugInfo, function (req, res) {


    var platform = req.params.platform;
    var price = req.params.price;
    var title = req.params.title;

    // if(platform="nopla"){
    //     platform=""
    // }

    // if(price="noprice"){
    //      price=""
    // }

    // if(title="notitle"){
    //     title=""
    // }
    console.log("platform:" + platform)
    console.log("price:" + price)
    console.log("title:" + title)


    platform = req.params.platform;
    price = req.params.price;
    title = req.params.title;

    game.findGameAllReq(platform, price, title, function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            output = {
                "Error": "Internal sever issues"
            };
            res.status(500).send(output);
        }
    });










});




app.get('/game/:id/review', printDebugInfo, function (req, res) {
    var gameid = req.params.id;

    review.getReviewWithGameId(gameid, function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            output = {
                "Error": "Internal sever issues"
            };
            res.status(500).send(output);
        }
    });

});







app.post('/users/', printDebugInfo, verifyToken, function (req, res) {
    // to extract data

    var username = req.body.username;
    var email = req.body.email;
    var type = req.body.type;
    var password = req.body.password;
    var profile_pic_url = req.body.profile_pic_url;


    // call the addUser function at user.js
    user.addUser(username, email, type, password, profile_pic_url, function (err, result) {
        // if there is no error the userid is shown in postman
        if (!err) {
            var output = {
                "userid": result.insertId
            }

            console.log("result comd" + output)


            res.status(201).send(result);
        }
        // else shows internal error
        else {
            output = {
                "Error": "Internal sever issues"
            };
            res.status(500).send(output);
        }
    });


});






app.get('/users/:userid', function (req, res) {
    var id = req.params.userid;
    user.getUser(id, function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send("Some error");
        }
    });

});

app.get('/users/', function (req, res) {

    user.getUsers(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send("Some error");
        }
    });

});

app.get('/games/', function (req, res) {

    game.getGames(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send("Some error");
        }
    });

});


// Assignment 2 view games
app.get('/games/:gameid/', printDebugInfo, function (req, res) {
    var id = req.params.gameid;
    game.getGame(id, function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send("Some error");
        }
    });

});



app.get('/api/category', printDebugInfo, function (req, res) {

    category.getCategories(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            res.status(500).send("Some error");
        }
    });

});





module.exports = app;
