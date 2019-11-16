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
    // Show all products on BAMAZON
    showProducts();
});

// Show all products
function showProducts() {
    var query = "Select * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i=0; 1 < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
        }
        // Finds product id and quantity for user
        findProducts();
    });
};

