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
    console.log("connected as id " + connection.threadId + "\n");
    startApp();
  });

  //function that kickstarts app menu prompt
  function startApp() {
      inquirer
        .prompt({
            name: "employeeCRUD",
            type: "list",
            message: "Would you like to [Add], [View],or [Update] an employee, role or department?",
            choices: ["Add Employee", "Add Role", "Add Department", "View Employees", "View Roles", "View Departments", "Update Employee Roles", "Exit"]
        })
        .then(function(answer) {
            if (answer.employeeCRUD === "Add Employee") {
                addEmployee();
            }
            else if(answer.employeeCRUD === "View Employees") {
                viewEmployees();
            } 
            else if(answer.employeeCRUD === "Add Role") {
                addRoles();
            } 
            else if(answer.employeeCRUD === "Add Department") {
                addDepartment();
            } 
            else if(answer.employeeCRUD === "View Roles") {
                viewRoles();
            } 
            else if(answer.employeeCRUD === "View Departments") {
                viewDepartments();
            } 
            else if(answer.employeeCRUD === "Update Employee Roles") {
                updateRole();
            } 
            else{
              connection.end();
            }
          });
  }

  //function to prompt user to view employees
  //update so it show role and department using a SQL JOIN

  function viewEmployees() {
      connection.query ("SELECT e.first_name,e.last_name, r.title, r.salary, d.name,  CONCAT(m.first_name, ' ', m.last_name)  as manager  from employees e LEFT JOIN roles  r on e.role_id = r.id LEFT JOIN departments d on r.department_id = d.id LEFT JOIN employees m on m.id = e.manager_id;", function (err, res) {
          if (err) throw err;
          console.table(res);
      })
      startApp();
      
  }

  function addEmployee() {

    inquirer
        .prompt ([
            {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "choices",
            message: "What is this employee's role?",
            choices: getRoles()
            
        },
        {
            name: "manager",
            type: "choices",
            message: "Whos is their Manager?",
            choices: ["Miguel Mejares", "Courtney Greenberg", "Ted Bundy", "Exit"]
        }
        ])
        .then(function(answer) {
            connection.query ("INSERT INTO employees SET ?", 

                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.choices,
                    manager_id: answer.manager
                },
                function (err) {
                    if (err) throw err;
                    console.log("employee succesfully added!");
                    startApp();
            })
        })
  
    
  }

function getRoles() {
    return connection.query ("SELECT * FROM roles");
}