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
  password: "5152",
  database: "employee_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("connected!");
    startApp();
  });

  function startApp() {
      inquirer
        .prompt({
            name: "employeeCRUD",
            type: "list",
            message: "Would you like to [Add], [View],or [Update] an employee, role or department?",
            choices: ["Add Employee", "Add Role", "Add Department", "View Employees", "View Roles", "View Departments", "Update Employee Roles"]
        })
        .then(function(answer) {
            if (answer.employeeCRUD === "Add Employee") {
              addEmployee();
            }
            else if(answer.employeeCRUD === "View Employees") {
              viewEmployees();
            } else{
              connection.end();
            }
          });
  }