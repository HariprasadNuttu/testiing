/*
 * Request Handlers
 *
 */

// Dependencies
var helpers = require('./helpers');
var config = require('./config');
// var connection = require('./db_setup').globalConnection();
var pg = require('pg');
var conString = "postgres://test:test@localhost:5432/sammy";
// Define all the handlers
var handlers = {};




// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};


handlers._users  = {};

handlers._users.post = function(data,callback){
console.log("INSERT");
  if(data.payload.length>0){
    var client = new pg.Client(conString)
    client.connect();
    data.payload.forEach(function (object) {
        // console.log(object.message_id);
        var str = "INSERT INTO message_list (message_id, message_contents,received_ts) VALUES ('"+object.message_id+"','"+ object.message_contents+"',"+object.received_ts+")"
        var query = client.query(str, (err, res) => {
          console.log(res);
          console.log(err ? err.stack : res.rows[0]) // Hello World!
        });
      })
      callback(200,{success:true,status:200,'message' : ['Successfully  inserted']});
      // client.end()
    // var values = data.payload.filter(function(p){ return [p.id,p.message_contents,p.received_ts]}).map(function(obj){return [obj.id,obj.message_contents,obj.received_ts]})
    // var connection = mysql.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "p@ssw0rd",
    //     database:"Vdart_Technologies"
    //   })
    //
    // connection.connect(function(err) {
    //   if (err) throw err;
    //   // var sql = "INSERT INTO message_list (id, message_contents,received_ts) VALUES ('Michelle', 'Blue Village 1',null)";
    //       // data.payload.forEach(function (object) {
    //         // var sql = "INSERT INTO message_list (id, message_contents,received_ts) VALUES ("+object.payload+","+ object.message_contents+","+object.received_ts+")";
    //         var sql = "INSERT INTO message_list (id, message_contents,received_ts) VALUES ?";
    //         console.log(values);
    //     // connection.query(sql,[values], function (err, result) {
    //     //   if (err) throw err;
    //     //   console.log("1 record inserted, ID: " + result.insertId);
    //     // });
    //     data.payload.forEach(function (object) {
    //       var sql = "INSERT INTO message_list (id, message_contents,received_ts) VALUES ("+object.id+","+ object.message_contents+","+object.received_ts+")";
    //       connection.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("1 record inserted, ID: " + result.insertId);
    //       });
    //     })
    //       // })
    //
    // });

  } else {
    callback(400,{success:false,status:400,'Error' : ['Invalid Payload']});
  }

};

// Export the handlers
module.exports = handlers;
