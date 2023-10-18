-- Add departments
INSERT INTO department (name) VALUES
  ('HR'),
  ('Finance'),
  ('Engineering'),
  ('Marketing');

-- Add roles
INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 70000, 1),
  ('Accountant', 60000, 2),
  ('Software Engineer', 80000, 3),
  ('Marketing Specialist', 55000, 4);

-- Add employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL), -- HR Manager, no manager
  ('Alice', 'Smith', 2, NULL), -- Accountant, no manager
  ('Bob', 'Johnson', 3, NULL), -- Software Engineer, no manager
  ('Eve', 'Williams', 4, NULL), -- Marketing Specialist, no manager
  ('Michael', 'Brown', 3, 1), -- Software Engineer, managed by John Doe
  ('Laura', 'Davis', 4, 1); -- Marketing Specialist, managed by John Doe
