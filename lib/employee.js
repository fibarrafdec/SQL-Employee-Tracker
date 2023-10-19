const sequelize = require('../db/connection');

// Create a new employee
function createEmployee(firstName, lastName, roleId, managerId) {
  // Convert empty managerId to null
  if (!managerId) {
    managerId = null;
  }
  return sequelize.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (:firstName, :lastName, :roleId, :managerId)', {
    replacements: { firstName, lastName, roleId, managerId },
    type: sequelize.QueryTypes.INSERT, // Set the query type to INSERT
  });
}

// Update an employee's role
function updateEmployeeRole(employeeId, roleId) {
  return sequelize.query('UPDATE employee SET role_id = ? WHERE id = ?', {
    replacements: [roleId, employeeId],
    type: sequelize.QueryTypes.UPDATE,
  });
}

// Delete an employee
function deleteEmployee(employeeId) {
  return sequelize.query('DELETE FROM employee WHERE id = ?', [employeeId]);
}

// Show all employees
function getAllEmployees() {
  return sequelize.query('SELECT * FROM employee');
}

// Export the functions
module.exports = {
  createEmployee,
  updateEmployeeRole,
  deleteEmployee,
  getAllEmployees,
};
