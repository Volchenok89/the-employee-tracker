const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Volchenok*8',
      database: 'employees'
    },
    console.log('Connected to database.')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Welcome to the employee tracker!');
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
      case "Add an employee":
        addEmployee()
        break;
      case "Update an employee role":
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
      message: "What is their first name?",
      type: "input",
      name: "first_name"
    },
    {
      message: "What is their last name?",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is their role ID?",
      type: "number",
      name: "role_id"
    },
    {
      message: "What is their manager ID?",
      type: "input",
      name: "manager_id"
    }
  ]).then(function(response) {
    db.query(`Insert into employee?`,
    [response.first_name, response.last_name, response.role_id, response.manager_id],
    (err,data) => {
      if (err) throw err;
      console.log("Successfully added employee!");
      // viewEmployees();
      startPrompt();
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