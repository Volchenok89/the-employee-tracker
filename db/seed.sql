INSERT INTO department (department_name)
VALUES

    ("Production"),
    ("Direction"),
    ("Sound Engineer"),
    ("Acting"),
    ("Video");
  
INSERT INTO role (title, salary, department_id)
VALUES
    ("Producer", 500000, 1),
    ("Director", 400000, 2),
    ("Video Manager", 200000, 3),
    ("Staff", 60000, 4),
    ("Accounting Executive", 200000, 5);

INSERT INTO employee (first_name, last_name, role_id, employee_id)
VALUES
    ("Gerardo", "Carmon", 1, 1),
    ("Maggie", "Hakn", 2, 2),
    ("Todd", "Castro", 3, 1),
    ("Mina", "Saberhagen", 4, 3),
    ("Ruth", "Grimaldi", 5, 2),
    ("Gina", "Guti", 6, 1),
    ("Elvis", "Tek", 7, 4);

