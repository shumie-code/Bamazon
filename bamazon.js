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

// Finds products quantity of items
function findProducts() {
    inquirer.prompt([{
        name: "product ID",
        type: "input",
        message: "Enter product ID for item",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
       
      },  {
            name: "productUnits",
            type: "input",
            message: "How many units would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }

        }
    }]).then(function(answer) {

        //Checks the database for the selected product
        var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
        connection.query(query, { item_id: answer.productID}, function(err, res) {
            if (err) throw err;

            var available_stock = res[0].stock_quantity;
            var price_per_unit = res[0].price;
            var productSales = res[0],product_sales;
            var prodcutDepartment = res[0].department_name;

            // Checks if there is enough inventory to process purchase

            if (available_stock >+ answer.productUnits) {

                // Complete customer request for purchase
                completePurchase(availble_stock, price_per_unit, productSales, prodcutDepartment, answer.productID, answer.productUnits);
                } else {
                    //Tells the user there isnt enough stock left
                    console.log("There isnt enough stock left sorry.");

                    //Lets Customer request another product
                    requestProduct();
                }
        });
    });
};



