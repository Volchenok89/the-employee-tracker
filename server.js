const db = require('./db/connection');
const conTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

//////////// INITIAL COMMANDS/////////////

function mainMenu() {
    inquirer.prompt([
        {
            name: "mainMenu",
            type: "list",
            message: `
            MAIN MENU
            ---------
            Please select an option.
            `,
            choices: [
                "View all Departments",
                "View all Roles",
                "View all Employees",
                "Add Department", 
                "Add Role",
                "Add employee", 
                "Update Employee's Role",
                "Quit"
            ]
        }
    ]).then(function (res) {
        switch (res.mainMenu) {
            case "View all Departments":
                viewAllDept();
            break;

            case "View all Roles":
                viewAllRoles();
            break;

            case "View all Employees":
                viewAllEmployees();
            break;

            case "Add a Department":
                addDept();
            break;

            case "Add a Role":
                addRole();
            break;

            case "Add an Employee":
                addEmployee();
            break;

            case "Update an Employee Role":
                updateEmployees();
            break;

            case "Quit":
                console.log("Thanks for updating your database, goodbye!");
            break;
        }
    })//
};


////////////////VIEW ALL DEPARTMENTS////////////////

function viewAllDept() {
    db.query(`SELECT * FROM department;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
};


/////////////////////// VIEW ALL ROLES//////////////////////////
function viewAllRoles() {
    db.query(`SELECT * FROM role;`, (err, data) => {
      if (err) throw err;
      console.table(data);
      startPrompt();
    });
  };

//////////////// VIEW ALL EMPLOYEES///////////////////

function viewAllEmployees() {
    db.query(`SELECT * FROM employee;`, (err, data) => {
      if (err) throw err;
      console.table(data);
      startPrompt();
    });
  };
/////////////// ADD DEPARTMENT//////////////////

function addDept() {
    inquirer.prompt({
      type: "input",
      name: "department",
      message: "What department would you like to add?"
    }).then(function(response) {
      db.query(`INSERT INTO department:`,
      [response.department], (err, data) => {
        if (err) throw err;
        console.log("Successfully created!");
   
        startPrompt();
      })
    })
  }



///////////////////////////// ADD ROLE///////////////////////////

function addRole() {
   
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Type employee's new role title:"
            },
            {
                name: "salary",
                type: "input",
                message: "Type a salary:"
            },
            {
                name: "department_id",
                type: "input",
                message: "Type department ID number:"
            }
        ]).then(function(response) {
            db.query(`INSERT INTO role (title, salary, department_id):`,
            [response.title, response.salary, response.department_id],
            (err, data) => {
              if (err) throw err;
              console.log("Role created!");
           
              startPrompt();
            });
          });
        };

/////////////////////// ADD EMPLOYEE//////////////////////

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Type employee's first name:",
        },

        {
            name: "lastName",
            type: "input",
            message: "Type employee's last name:",
        },

        {
            name: "role",
            type: "list",
            message: "Please type employees role:",
            choices: "role"
        },

        {
            message: "What is their manager ID?",
            type: "input",
            name: "manager_id"
          }


        ]).then(function(response) {
            db.query(`Insert in employee?`,
            [response.first_name, response.last_name, response.role_id, response.manager_id],
            (err,data) => {
              if (err) throw err;
              console.log("Successfully added!");
              
              startPrompt();
            });
          });
        };


/////////////////////// UPDATE EMPLOYEE ///////////////////////

function updateEmployees() {
    inquirer.prompt([
        {
            name: "empName",
            type: "input",
            message: "Employee to be updated.",
        },
        {
            name: "newRole",
            type: "input",
            message: "Type new role ID for employee.",
        },
    ]).then(function (res) {
        const empName = res.empName;
        const newRole = res.newRole;
        const dbUpdate = `UPDATE employees SET role_id = "${newRole}" WHERE id = "${empName}"`;
        db.query(dbUpdate, function (err, res) {
            if (err) throw err;
            console.table(res);
        })
        db.query(`SELECT * FROM employees;`,
            function (err, res) {
                if (err) throw err;
                console.table(res);
                console.log("Employee updated!.");
                startPrompt();
            });
    });
}

mainMenu();