console.log("---------------------------------------------------------");
console.log("Assignment 2> model >babies.js");
console.log("---------------------------------------------------------");



var pool = require('../controller/databaseConfig');

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------
var BabiesDB = {



    getBabies: function (callback) {

        var sql = 'SELECT * FROM babies_record.baby; ;';

        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                       return callback(err.null);
            } else {
                return callback(null, result);
            }
             // pool.end()
            })




    },


    getBaby: function (id, callback) {

        var sql="SELECT * FROM babies_record.baby where id =?;"

        const values = [id]

        pool.query(sql,values,(err, result) => {
            if(err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null,result);
            }
        })


    },



    deleteBaby: function (id, callback) {



var sql="DELETE FROM babies_record.baby where id =?;"

        const values = [id]

        pool.query(sql,values,(err, result) => {
            if(err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null,result);
            }
        })


    },


    //  Assignment 2
    addBaby: function (name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, callback) {


   
                var sql = `INSERT INTO
                babies_record.baby (
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

       
        pool.query(sql,[name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
             // pool.end()
            })




    },




    updateBaby: function (name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, id, callback) {
        // geta connection to the database
        // var conn = db.getConnection();

        // conn.connect(function (err) {



        //     console.log("Connected!");
        //     // try {
        //         var sql = `
        //         UPDATE 
        //         baby
        //      SET
        //         name=?,
        //         height_six_month=?,
        //         height_seven_month=?,
        //          height_eight_month=?,
        //           height_nine_month=?,
        //            height_ten_month=?
        //     where
        //          id=?
        //          ;
                

        //         `;
            

        //         conn.query(sql, [name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month, id], function (err, result) {


        //             if (err) {

        //                 console.log(err);
        //                 err = "Invalid Input"
        //                 return callback(null, err);
        //             }
        //             else {

                     

        //                 return callback(null, result);
        //             }
        //             conn.end();
        //         });


                var sql = `
                UPDATE 
                babies_record.baby
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
       
       pool.query(sql,[name, height_six_month, height_seven_month, height_eight_month, height_nine_month, height_ten_month,id],(err, result) => {
           if(err) {
               console.log(err);
               return callback(err);
           } else {
               return callback(null,result);
           }
       })

         




         }
        
        
      
    }



;

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