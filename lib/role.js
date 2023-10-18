const sequelize = require('../db/connection');

// Create a new role
function createRole(title, salary, departmentId) {
  return sequelize.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
    title,
    salary,
    departmentId,
  ]);
}

// Delete a role (and its associated employees)
function deleteRole(roleId) {
  return sequelize.promise().query('DELETE FROM role WHERE id = ?', [roleId]);
}

// Export the functions
module.exports = { createRole, deleteRole };
