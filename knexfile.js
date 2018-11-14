var pg = require('pg');
var conString = "postgres://test:test@localhost:5432/sammy";

var client = new pg.Client(conString)
client.connect();
var query = client.query('CREATE TABLE message_list(message_id uuid,message_contents VARCHAR(40),received_ts  TIMESTAMP NOT NULL DEFAULT NOW())',(err, res) => {
  console.log(res);
  console.log(err ? err.stack : res.rows[0]) // Hello World!
  client.end()
});
