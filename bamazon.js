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
    password: "Jordan9152!",
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
            console.log("Product ID: " + res[i].item_id + " || Department Name: " + res[i].department_name + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
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
    ]).then(function(answer) {

        //Checks the database for the selected product
        var query = "Select stock_quantity, price, product_name, department_name FROM products WHERE ?";
        connection.query(query, {item_id: answer.productID}, function(err, res) {
            if (err) throw err;

            var available_stock = res[0].stock_quantity;
            var price_per_unit = res[0].price;
            var productSales = res[0].product_name;
            var productDepartment = res[0].department_name;
            var productID = res[0].item_id;

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

// Complete user's request to purchase product
function completePurchase(availableStock, price, productsSales, prodcutDepartment, selectedProductID, selectedProductUnits) {
    // Update stock quantity once purchase complete.
    var updatedStockQuantity = avaibleStock - selectedProductUnits; 

    // Calculate total price for purchase based on unit price, and number of units.
    var totalPrice = price * selectedProductsUnits;

    //Updates total product sales.
    var updateProductsSales = parseInt(productSales) + parseInt(totalPrice);

    // Updates stock quantity on the database based on user's purchase.
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
        stock_quantity: updatedStockQuantity,
        product_name: updatedProductSales

    }, {
        item_id: selectedProductID
    }], function(err, res) {
        if (err) throw err;
        // Tells user purchase is cleared
        console.log("Great!, your purchase has cleared.");

        // Display the total price for that purchase.
        console.log("You're payment has been recieved :  " + totalPrice);

        //Updates department revenue based on purchase.
        updateDepartmentRevenue(updatedProductSales, productDepartment);
        //Displays products so user can make a new selection.
    });
};

// Completes update to total sales for department on database.
function updateDepartmentRevenue(updatedProductSales, prodcutDepartment) {

    //Query database for total sales value for department.
    var query = "Select total_sales FROM departments WHERE ?";
    connection.query(query, { department_name: prodcutDepartment}, function(err, res) {

        if (err) throw err;

        var departmentSales = res[0].total_sales;

        var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedProductSales);

        // Completes update to total sales for department

        completeDepartmentSalesUpdate(updatedDepartmentSales, prodcutDepartment);

    });
};


// Completes update to total sales for department on database
function completeDepartmentSalesUpdate(updatedDepartmentSales, productDepartment) {

    var query = "Update departments SET ? WHERE ?";
    connection.query(query, [{
        total_sales: updatedDepartmentSales
    }, {
        department_name: prodcutDepartment
    }], function(err, res) {
        if (err) throw err;

        //Displays products so user can choose to make another purchase.
        displayProducts();
    });
};