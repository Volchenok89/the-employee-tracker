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
    ("Frontend Engineer", 150000, 1),
    ("Backend Engineer", 150000, 1),
    ("Product Manager", 130000, 2),
    ("Support Specialist", 100000, 3),
    ("Account Executive", 100000, 4),
    ("Sales Engineer", 120000, 4),
    ("Accounts Receivable", 140000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Patrick", "Lago", 1, 1),
    ("Stephen", "Curry", 2, 2),
    ("Klay", "Thompson", 3, null),
    ("Draymond", "Green", 4, 3),
    ("Steve", "Kerr", 5, 2),
    ("James", "Wiseman", 6, null),
    ("Andrew", "Wiggins", 7, 4),
    ("Kevon", "Looney", 5, 2);