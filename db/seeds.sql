USE employee_DB;

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("Miguel", "Mejares", 1, null), ("Courntey", "Greenberg", 2, 1), ("Jack", "Johnson", 3, 1), ("John", "Mayer", 4, 1),
    ("Bob", "Smith", 5, 1), ("Sally", "Sue", 6, 2), ("Ted", "Bundy", 7, 2), ("Roger", "Gracier", 8, 2), ("Al", "Horford", 7, 2),
    ("Scottie", "Pippen", 10, 7);


    INSERT INTO roles (title, salary, department_id)
    VALUES ("CEO", 1000000, 1), ("Sales Manager", 120000, 2),("Accountant", 600000, 3), ("Lawyer", 130000, 4),
    ("Engineer", 100000, 5), ("Salesman", 75000, 2),("Sales Development", 50000, 2);

    INSERT INTO departments (name)
    VALUES ("C-Suite"), ("Sales"), ("Accounting"), ("Legal"), ("Engineering"); 

