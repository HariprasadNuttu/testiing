/*
 * Request Handlers
 *
 */

// Dependencies
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
  if(data.payload.length>0){
    var client = new pg.Client(conString)
    client.connect();
    data.payload.forEach(function (object) {
        var str = "INSERT INTO message_list (message_id, message_contents,received_ts) VALUES ('"+object.message_id+"','"+ object.message_contents+"',"+object.received_ts+")"
        var query = client.query(str, (err, res) => {
          console.log(res);
          console.log(err ? err.stack : res.rows[0]) // Hello World!
        });
      })
      callback(200,{success:true,status:200,'message' : ['Successfully  inserted']});

  } else {
    callback(400,{success:false,status:400,'Error' : ['Invalid Payload']});
  }

};

// Export the handlers
module.exports = handlers;
