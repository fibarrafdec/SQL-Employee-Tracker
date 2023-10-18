const sequelize = require('../db/connection');

// Create a new employee
function createEmployee(first_name, last_name, role_id, manager_id) {
  return sequelize.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [
    first_name,
    last_name,
    role_id,
    manager_id,
  ]);
}

// Update an employee's role
function updateEmployeeRole(employeeId, newRoleId) {
  return sequelize.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
}

// Update an employee's manager
function updateEmployeeManager(employeeId, newManagerId) {
  return sequelize.promise().query('UPDATE employee SET manager_id = ? WHERE id = ?', [newManagerId, employeeId]);
}

// Delete an employee
function deleteEmployee(employeeId) {
  return sequelize.promise().query('DELETE FROM employee WHERE id = ?', [employeeId]);
}

// Get employees by manager
function getEmployeesByManager(managerId) {
  return sequelize.promise().query('SELECT * FROM employee WHERE manager_id = ?', [managerId]);
}

// Get employees by department
function getEmployeesByDepartment(departmentId) {
  return sequelize.promise().query(
    'SELECT e.* FROM employee e INNER JOIN role r ON e.role_id = r.id WHERE r.department_id = ?',
    [departmentId]
  );
}

// Export the functions
module.exports = {
  createEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  deleteEmployee,
  getEmployeesByManager,
  getEmployeesByDepartment,
};
