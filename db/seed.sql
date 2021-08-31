USE employees;

INSERT INTO department(name)
VALUES 
    ("Production"),
    ("Direction"),
    ("Sound Engineer"),
    ("Acting"),
    ("Video"),

INSERT INTO role(title, salary, department_id)
VALUES
    ("Producer", 500000, 1),
    ("Director", 400000, 1),
    ("Video Manager", 200000, 2),
    ("Staff", 60000, 3),
    ("Accounting Executive", 200000, 4),


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ("Gerardo", "Carmon", 1, NULL),
    ("Maggie", "Hakn", 2, 2),
    ("Todd", "Castro", 3, NULL),
    ("Mina", "Saberhagen", 4, 3),
    ("Ruth", "Grimaldi", 5, 2),
    ("Gina", "Guti", 6, NULL),
    ("Elvis", "Tek", 7, 4);
   