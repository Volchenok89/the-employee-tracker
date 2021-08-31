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


////////////////Department names and Id's////////////////

function viewAllDept() {
    db.query(`SELECT * FROM department;`, function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu()
    });
};

/////////////////////// VIEW ALL ROLES//////////////////////////
function viewAllRoles() {
    db.query(`SELECT * FROM role; `, function  (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu()
    });
};

//////////////// VIEW ALL EMPLOYEES///////////////////


function viewAllEmployees() {
  
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS Manager 
    FROM employees 
    INNER JOIN role 
    ON role.id = employees.role_id 
    INNER JOIN department 
    ON department.id = role.department_id 
    LEFT JOIN employees e 
    ON employees.manager_id = e.id;`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            mainMenu()
        });
};


/////////////// ADD A DEPARTMENT//////////////////

function addDept() {

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Type department to add:"
        }
    ]).then(function (res) {
        const query = db.query(
            `INSERT INTO department?:`,
            {
                name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                mainMenu()
            }
        )
    });
};

///////////////////////////// ADD EMPLOYEE ROLE///////////////////////////

function addRole() {
    db.query(`SELECT role.title 
    AS title, role.salary 
    AS Salary 
    FROM role`, function (err, res) {
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
        ]).then(function (res) {
            db.query(
                "Insert into role?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department_id,
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    mainMenu()
                }
            )
        });
    });
}

/////////////////////// ADD AN EMPLOYEE//////////////////////

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Type employee's first name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Type employee's last name:"
        },
        {
            name: "role",
            type: "list",
            message: "Please type employees role:",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Please type manager:",
            choices: selectManager()
        },
    ]).then(function (res) {
        let roleId = selectRole().indexOf(res.role) + 1
        let managerId = selectManager().indexOf(res.manager) + 1
        db.query("Do you want to inser into imployees set?",
            {
                first_name: res.firstName,
                last_name: res.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(res)
                mainMenu()
            })
    })
};

////////////////////////// SELECT ROLE TITLE ////////////////////////////
let roleArr = [];
function selectRole() {
    db.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

////////////////////////// SELECT MANAGER ////////////////////////////

let managerArr = [];
function selectManager() {
    db.query(`SELECT first_name, last_name 
    FROM employees 
    WHERE manager_id 
    IS NULL`, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    })
    return managerArr;
}

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
                mainMenu();
            });
    });
}

mainMenu();