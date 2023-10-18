const sequelize = require('../db/connection');

// Create a new department
function createDepartment(name) {
  return sequelize.promise().query('INSERT INTO department (name) VALUES (?)', [name]);
}

// Get the total budget of a department
function getDepartmentBudget(departmentId) {
  return sequelize.promise().query(
    'SELECT SUM(role.salary) AS total_budget FROM role WHERE role.department_id = ?',
    [departmentId]
  );
}

// Delete a department (and its associated roles and employees)
function deleteDepartment(departmentId) {
  return sequelize.promise().query('DELETE FROM department WHERE id = ?', [departmentId]);
}

// Export the functions
module.exports = { createDepartment, getDepartmentBudget, deleteDepartment };
