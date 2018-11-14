var mysql = require('mysql2');


var options ={
  host: "localhost",
  user: "root",
  password: "p@ssw0rd"
}


connection ={
  createDb:function() {
    database =  mysql.createConnection(options);
  return   new Promise(function(resolve, reject) {
      database.connect(function(err) {
       if (err) {

         reject({success:false})
       }
       console.log("Connected!");
       database.query("CREATE DATABASE IF NOT EXISTS Vdart_Technologies", function (err, result) {
         if (err) throw err;
         console.log("Database created");
         resolve({success:true})
       });
     })
    });

  },
  createTable:function() {
    globalConnection = mysql.createConnection(options);
      globalConnection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "CREATE TABLE IF NOT EXISTS message_list (id binary(16) NOT NULL, message_contents VARCHAR(255),received_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
        globalConnection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
      });
  },
  getConfig: options,
  globalConnection:function () {
    return    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "p@ssw0rd",
        database:"Vdart_Technologies"
      })

  }


}
module.exports = connection;
