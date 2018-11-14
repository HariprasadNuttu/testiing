/*
 * Request Handlers
 *
 */

// Dependencies
var helpers = require('./helpers');
var config = require('./config');
var connection = require('./db_setup').globalConnection();

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

    data.payload.forEach(function (object) {
      console.log(object);
      connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO message_list (id, message_contents,received_ts) VALUES ("+object.payload+","+ object.message_contents+","+object.received_ts+")";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
    })

  } else {
    callback(400,{success:false,status:400,'Error' : ['Invalid Payload']});
  }

};




// Export the handlers
module.exports = handlers;
