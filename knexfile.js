var con = require('./lib/db_setup');
// var connectionObj = con.getConfig;
// var createDb = con.createDb();

var pg = require('pg');
var conString = "postgres://test:test@localhost:5432/sammy";

var client = new pg.Client(conString)
client.connect();
var query = client.query('CREATE TABLE message_list(message_id uuid,message_contents VARCHAR(40),received_ts  TIMESTAMP NOT NULL DEFAULT NOW())',(err, res) => {
  console.log(res);
  console.log(err ? err.stack : res.rows[0]) // Hello World!
  client.end()
});

// var query = client.query("INSERT INTO  message_list(message_id,message_contents,received_ts) values ('943aa917-e7d4-11e8-855f-64006a553921','asdfasdfasdfas',DEFAULT)", (err, res) => {
//   console.log(res);
//   console.log(err ? err.stack : res.rows[0]) // Hello World!
//   client.end()
// });


// query.on('end',function () {
//   client.end();
// })
// createDb.then(function(result) {
//         connectionObj.database = "Vdart_Technologies"
//
//         var createTable = con.createTable();
//
//     }, function(err) {
//       console.log("FAilure");
//         console.log(err);
//     })
