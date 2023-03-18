var mysql = require('mysql');
const fs = require('fs');

// https://github.com/mysqljs/mysql#pooling-connections
// change to pooled as drops connection



  // get db details
  try {
    //var dbInfo = fs.readFileSync("./database-login.json", 'utf8');
    //dbInfo = JSON.parse(dbInfo);

    var pool = mysql.createPool({
      host: "database-2.cwclvgw1cib6.ap-southeast-2.rds.amazonaws.com",
      user: "admin",
      password: "kc9TKHtoatKiyXykr5LM",
      database: "onboardingzones2"
    });

    pool.getConnection(function(err, connection) {
      // no release here?, see below
      if(!err) {
        console.log("Database is connected");
        //console.log("Navigate to http://localhost:3000");
      } else {
        console.log("Error while connecting to database");
        //throw err; throw it??
      }
    });
    module.exports = pool;

    } catch (err) {
    console.log("No database info file");
    }
