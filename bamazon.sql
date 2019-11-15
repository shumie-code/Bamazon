DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_db;

CREATE TABLE products (
product_name VARCHAR(100) NULL,
item_id INT NOT NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (product_name)
);

SELECT * FROM products;
SELECT * FROM bamazon_db;
