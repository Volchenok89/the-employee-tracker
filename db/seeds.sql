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
    ("Frontend Engineer", 200000, 1),
    ("Backend Engineer", 200000, 1),
    ("Product Manager", 160000, 2),
    ("Support Specialist", 140000, 3),
    ("Accounting Executive", 160000, 5),
    ("Sales Engineer", 120000, 4),
    ("Finance Treasurer", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Mina", "Saberhagen", 1, 1),
    ("Tonchi", "Castro", 2, 2),
    ("Alexandra", "Karkali", 3, null),
    ("Maggie", "Schmidt", 4, 3),
    ("Arya", "Casiraghi", 5, 2),
    ("Ruth", "Grimaldi", 6, null),
    ("Gianni", "Gutti", 7, 4),
    ("Salem", "Saberhagen", 5, 2);