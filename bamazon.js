var mysql = require("mysql");
var inquirer = require("inquirer");

//Create the connection information for the sql database
var connection = mysql.createConnection({
    
    host: "localhost",
    //PORT
    port: 3306,
    //USERNAME
    user: "root",
    // PASSWORD
    password: "shumie",
    // Database Used
    database: "bamazon_db"
});

//connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt use
    start();
});