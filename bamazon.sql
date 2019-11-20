DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id);
);

SELECT * FROM products;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  total_sales DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (department_id);
);
Select * From departments;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';

INSERT INTO departments(department_name, over_head_costs) VALUES('cell phones', 150);
INSERT INTO departments(department_name, over_head_costs) VALUES('tv', 200);
INSERT INTO departments(department_name, over_head_costs) VALUES('wearables', 400);
INSERT INTO departments(department_name, over_head_costs) VALUES('laptops', 350);
INSERT INTO departments(department_name, over_head_costs) VALUES('earphones', 100);

