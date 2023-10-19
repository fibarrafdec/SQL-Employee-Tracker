const sequelize = require('../db/connection');

// Get all departments
function getAllDepartments() {
  return sequelize.query('SELECT * FROM department');
}

// Create a new department
function createDepartment(name) {
  return sequelize.query('INSERT INTO department (name) VALUES (:name)', {
    replacements: { name },
    type: sequelize.QueryTypes.INSERT, // Set the query type to INSERT
  });
}

// Get the total budget of a department
function getDepartmentBudget(departmentId) {
  return sequelize.query(
    'SELECT SUM(role.salary) AS total_budget FROM role WHERE role.department_id = ?',
    [departmentId]
  );
}

// Delete a department (and its associated roles and employees)
function deleteDepartment(departmentId) {
  return sequelize.query('DELETE FROM department WHERE id = ?', [departmentId]);
}

// Export the functions
module.exports = { getAllDepartments, createDepartment, getDepartmentBudget, deleteDepartment };
