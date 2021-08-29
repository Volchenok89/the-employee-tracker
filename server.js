const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "volchenok",
      password: "1234",
      database: "employees"
    },
    console.log("Connected to the election database.")
);

db.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the employee tracking system.");
  startPrompt();
});

function startPrompt() {
  inquirer.prompt({
    message: "Please select an option:",
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
    message: "Please add a department:"
  }).then(function(response) {
    db.query(`INSERT INTO department (name) VALUES (?)`,
    [response.department], (err, data) => {
      if (err) throw err;
      console.log("Departmemt branch created!");
      // viewDepartments();
      startPrompt();
    })
  })
}

function addRole() {
  inquirer.prompt([
    {
      message: "Please add a role's title:",
      type: "input",
      name: "title"
    },
    {
      message: "Please add a role's salary:",
      type: "input",
      name: "salary"
    },
    {
      message: "Please add a department ID for the role:",
      type: "number",
      name: "department_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [response.title, response.salary, response.department_id],
    (err, data) => {
      if (err) throw err;
      console.log("New role created Successfully!");
      // viewRoles();
      startPrompt();
    });
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      message: "Please type a first name:",
      type: "input",
      name: "first_name"
    },
    {
      message: "Please type a last name:",
      type: "input",
      name: "last_name"
    },
    {
      message: "Please type a role ID:",
      type: "number",
      name: "role_id"
    },
    {
      message: "Please type a manager ID:",
      type: "input",
      name: "manager_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
    [response.first_name, response.last_name, response.role_id, response.manager_id],
    (err,data) => {
      if (err) throw err;
      console.log("Employee addition successfull!");
      // viewEmployees();
      startPrompt();
    });
  });
};

function updateRole() {
  inquirer.prompt([
    {
      message: "Plase enter a last name for an employee's role update:",
      type: "input",
      name: "last_name"
    },
    {
      message: "Plase add a new role ID:",
      type: "number",
      name: "role_id"
    }
  ]).then(function(response) {
    db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, 
    [response.role_id, response.last_name],
    (err, data) => {
      if (err) throw err;
      console.log("Role successfully updated!");
      startPrompt();
    });
  });
};