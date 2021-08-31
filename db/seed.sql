USE employees;

INSERT INTO department (name)
VALUES 
    ("Engineering"),
    ("Product Design"),
    ("Support"),
    ("Sales"),
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Software Engineer", 200000, 1),
    ("Product Manager", 160000, 2),
    ("Support Specialist", 140000, 3),
    ("Accounting Executive", 160000, 5),
    ("Sales Engineer", 120000, 4),
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Mina", "Saberhagen", 1, null),
    ("Tonchi", "Castro", 2, null),
    ("Alexandra", "Karkali", 3, null),
    ("Salem", "Saberhagen", 5, null);
    ("Ruth", "Grimaldi", 4, null),