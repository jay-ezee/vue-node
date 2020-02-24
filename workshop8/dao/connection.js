require("dotenv").config();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) {
    console.error("Error:- " + err.stack);
    return;
  }
  console.log("Connected to the MySQL server.");
});

module.exports = con;
