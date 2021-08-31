const db = require('./db/connection');
const table = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

//////////MENU/////////
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
                "Add a Department", 
                "Add a Role",
                "Add an Employee", 
                "Update an Employee Role",
                "Quit"
            ]
        }
    ]).then(function (res) {
        switch (res.mainMenu) {
            case "View all Departments":
                viewAllDepartments();
            break;

            case "View all Roles":
                viewAllRoles();
            break;

            case "View all Employees":
                viewAllEmployees();
            break;

            case "Add a Department":
                addDepartment();
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
                console.log("Goodbye!");
            break;
        }
    })
};


//////////SEE ALL DEPARTMENTS//////////
function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        startPrompt();
      });
    };

//////////SEE ALL ROLES//////////////
function viewAllRoles() {
    db.query(`SELECT * FROM role;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        startPrompt();
      });
    };

////////////VIEW ALL EMPLOYEES/////////////
function viewAllEmployees() {
    db.query(`SELECT * FROM employee;`, (err, data) => {
        if (err) throw err;
        console.table(data);
        startPrompt();
      });
    };


/////////////////ADD DEPARTMENT////////////////
function addDepartment() {
    inquirer.prompt({
      type: "input",
      name: "department",
      message: "Add a department:"
    }).then(function(response) {
      db.query(`INSERT INTO department (name) VALUES (?)`,
      [response.department], (err, data) => {
        if (err) throw err;
        console.log("Successfull!!");
      
        startPrompt();
      })
    })
  }

//////////ADD ROLE///////////
function addRole() {
    db.query(`SELECT * FROM role`, function (err, res) {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "Employee's role?"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter salary:"
            },
            {
                name: "department_id",
                type: "input",
                message: "Department ID number:"
            }

            
        ]).then(function (res) {
            db.query(
                "INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department_id,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
}

///////////////ADD EMPLOYEE///////////////
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter  first name."
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter  last name."
        },
        {
            name: "role",
            type: "list",
            message: "Please select the employee's role:",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Enter manager:",
            choices: selectManager()
        },


    ]).then(function (res) {
        let roleId = selectRole().indexOf(res.role) + 1
        let managerId = selectManager().indexOf(res.manager) + 1
        db.query("Add into employees ?",
            {
                first_name: res.firstName,
                last_name: res.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(res)
                startPrompt();
            })
    })
};


///////////UPDATE EMPLOYEE////////////

function updateEmployees() {
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "Employee ID:",
        },
        {
            name: "New role",
            type: "input",
            message: "New Employee ID:",
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
                console.log('Employee updated.');
                startPrompt();
            });
    });
}

startPrompt();