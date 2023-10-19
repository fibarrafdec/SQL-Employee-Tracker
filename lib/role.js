const sequelize = require('../db/connection');

// Create a new role
function createRole(title, salary, departmentId) {
  return sequelize.query('INSERT INTO role (title, salary, department_id) VALUES (:title, :salary, :departmentId)', {
    replacements: { title, salary, departmentId },
    type: sequelize.QueryTypes.INSERT, // Set the query type to INSERT
  });
}

// Delete a role
function deleteRole(roleId) {
  return sequelize.query('DELETE FROM role WHERE id = ?', [roleId]);
}

function getAllRoles() {
  return sequelize.query('SELECT * FROM role', { type: sequelize.QueryTypes.SELECT });
}

// Export the functions
module.exports = {
  createRole,
  deleteRole,
  getAllRoles,
};
