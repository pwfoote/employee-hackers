-- seed department table
INSERT INTO department (name)
  VALUES
  ('Human Resources'),
  ('Accounting'),
  ('Information Technology'),
  ('Legal'),
  ('Marketing');

-- seed role table
INSERT INTO role (title, salary, department_id)
  VALUES
  ('HR Manager', 35000, 1),
  ('Accountant', 60000, 2),
  ('Auditor', 120000, 2),
  ('Engineer', 50000, 3),
  ('Attorney', 130000, 4),
  ('Marketing Manager', 65000, 5);

-- seed employee table
-- NOTE: cannot use a manager_id value that is a higher value than the current employee.id you're using it on because that manager won't exist yet
INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('Martin', 'Platte', 2, NULL),
  ('Gurtrud', 'Haverty', 1, NULL),
  ('Alfie', 'Toom', 3, 3),
  ('Brad', 'Darad', 4, NULL),
  ('Johnny', 'Amoss', 5, 5),
  ('Ken', 'Wiltz', 5, 3),
  ('Justin', 'Gloom', 4, 2),
  ('Adam', 'West', 3, NULL),
  ('George', 'Martin', 2, NULL),
  ('Lexi', 'Stone', 1, 4),
  ('Fallon', 'Ruff', 2, 2),
  ('Vince', 'Cannon', 4, 1),
  ('Kyle', 'Tenztil', 5, 3);