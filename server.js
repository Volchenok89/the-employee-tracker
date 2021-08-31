const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "VOLchenok*8",
      database: "employees"
    },
    console.log("Connected to database.")
);

db.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the employee tracker!");
  startPrompt();
});

function startPrompt() {
  inquirer.prompt({
    message: "Please select:",
    type: "list",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit"
    ], 
    name: "choice"
  }).then(answers => {
    switch (answers.choice) {
      case "View all departments":
        viewDepartments()
        break;
      case "View all roles":
        viewRoles()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "Add a department":
        addDepartment()
        break;
      case "Add a role":
        addRole()
        break;
      case "Add employee":
        addEmployee()
        break;
      case "Update employee role":
        updateRole()
        break;
    };
  });
};

function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

function viewEmployees() {
  db.query(`SELECT * FROM employee;`, (err, data) => {
    if (err) throw err;
    console.table(data);
    startPrompt();
  });
};

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?"
  }).then(function(response) {
    db.query(`INSERT INTO department (name) VALUES (?)`,
    [response.department], (err, data) => {
      if (err) throw err;
      console.log("Successfully created new department!");
      // viewDepartments();
      startPrompt();
    })
  })
}

function addRole() {
  inquirer.prompt([
    {
      message: "What is the role's title?",
      type: "input",
      name: "title"
    },
    {
      message: "What is the role's salary?",
      type: "input",
      name: "salary"
    },
    {
      message: "What is the derpartment ID for the role?",
      type: "number",
      name: "department_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [response.title, response.salary, response.department_id],
    (err, data) => {
      if (err) throw err;
      console.log("Successfully created new role!");
      // viewRoles();
      startPrompt();
    });
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      message: "Add first name:",
      type: "input",
      name: "first_name"
    },
    {
      message: "Add last name:",
      type: "input",
      name: "last_name"
    },
    {
      message: "Add role ID:",
      type: "number",
      choices: selectRole()
    },
    {
      message: "Add manager ID:",
      type: "input",
      choices: selectManager()
    }
]).then(function (res) {
    let roleId = selectRole().indexOf(res.role) + 1
    let managerId = selectManager().indexOf(res.manager) + 1
    db.query("INSERT INTO employeesT:",
        {
            first_name: res.firstName,
            last_name: res.lastName,
            manager_id: managerId,
            role_id: roleId

        }, function (err) {
            if (err) throw err
            console.table(res)
      
            mainMenu()
    });
  });
};

function updateRole() {
  inquirer.prompt([
    {
      message: " Please enter last name:",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is the new ID?",
      type: "number",
      name: "role_id"
    }
  ]).then(function(response) {
    db.query(`Update employee?`, 
    [response.role_id, response.last_name],
    (err, data) => {
      if (err) throw err;
      console.log("Role updated successfully!");
      startPrompt();
    });
  });
};