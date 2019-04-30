var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "jap0bzfig0",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    //query all the items for sale
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    }
                },
                //ask ID number and how many units of the product they would like
                {
                    name: "ID",
                    type: "input",
                    message: "What is the ID number of the product you would like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "unitAmount",
                    type: "input",
                    message: "How many units are you interested in buying?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    console.log(answer.ID);
                    console.log(typeof(results[i]));
                    console.log(typeof(answer.ID));
                    if (results[i].item_id == answer.ID) {
                        chosenItem = results[i];
                    }
                }
                console.log(chosenItem);
                console.log(typeof(chosenItem));
                console.log(chosenItem.stock_quantity)
                console.log(parseInt(chosenItem.stock_quantity));
                console.log(chosenItem.ID);
                // determine if there is enough units to sell
                //try stock_quantity instead of chosenItem.unitAmount
                if (chosenItem.stock_quantity < parseInt(answer.unitAmount)) {
                    console.log("Unable to process request, insufficient quantity remaining!");
                    start();
                }
                else {
                    // If enough units, sell uints and update db
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenItem.stock_quantity - answer.unitAmount
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            var total = answer.unitAmount * chosenItem.price;
                            console.log("Purchase complete! Your total is: " + total);
                            start();
                            
                        });
                }
            });
            
        });
    }