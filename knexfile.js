var con = require('./lib/db_setup');
var connectionObj = con.getConfig;
var createDb = con.createDb();

createDb.then(function(result) {
        connectionObj.database = "Vdart_Technologies"

        var createTable = con.createTable();

    }, function(err) {
      console.log("FAilure");
        console.log(err);
    })
