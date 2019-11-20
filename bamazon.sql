DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("cell phones", "iphone", 799.99, 100), ("tv's", "samsung", 999.99, 120), ("wearables", "apple watch", 349.99, 90), ("laptops", "lenovo", 899.99, 50), ("earphones", "airpods", 249.99, 20), ("cell phones", "galaxy", 999.99, 120), ("tv's", "sony", 649.99, 200), ("wearables", "fitbit", 199.99, 250), ("laptops", "macbook", 1200.99, 35), ("earphones", "beats", 349.99, 20) 

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  total_sales DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (department_id)
);
Select * From departments;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';
