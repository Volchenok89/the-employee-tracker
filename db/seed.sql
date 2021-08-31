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
    ("Support Specialist", 100000, 3),
    ("Accounting Executive", 150000, 4),
    ("Sales Engineer", 150000, 4),
    ("Accounts Receivable", 140000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Gerardo", "Carmona", 1, 1),
    ("Maggie", "Hakn", 2, 2),
    ("Mina", "Saberhagen", 3, null),
    ("Salem", "Saberhagen", 4, 3),
    ("Ruth", "Grimaldi", 5, 2),
    ("Gina", "Guti", 6, null),
    ("Elvis", "Tek", 7, 4),
    ("Nala", "Markk", 5, 2);