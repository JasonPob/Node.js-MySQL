# Node.js-MySQL
# Node.js & MySQL

  

In this assignment we created an Amazon-like storefront using MySQL.

The goal of this project is to allow the user to implement command line inputs to purchase goods offered in the MySQL Database. Goods are organized by:
* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in store)

In order to use the app we need to first create data for the marketplace using MySQL.
![packages](images/Screenshot%20(11).png)
![packages](images/Screenshot%20(12).png)

Next we set up the app by installing the various npm packages:
![packages](images/Screenshot%20(16).png)
  
  Then we run the bamazonCustomer.js file:
  ![packages](images/Screenshot%20(18).png)

The user will then be prompted to choose and item from the database:
![packages](images/Screenshot%20(17).png)

Followed by two questions:
![packages](images/Screenshot%20(19).png)

After the questions are answered, the purchase is made and the user is told how much their purchase will cost:
![packages](images/Screenshot%20(20).png)

If there are not enough units to fulfill the request the user will be prompted ""Unable to process request, insufficient quantity remaining!"
![packages](images/Screenshot%20(22).png)

The code in its entirety:
![packages](images/Screenshot%20(13).png)
![packages](images/Screenshot%20(14).png)
![packages](images/Screenshot%20(24).png)