const inquirer = require('inquirer');
const sequelize = require('./db/connection');
const departmentFunctions = require('./lib/department');
const roleFunctions = require('./lib/role');
const employeeFunctions = require('./lib/employee');

// Helper function to display the main menu
function displayMainMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Delete a department':
          deleteDepartment();
          break;
        case 'Delete a role':
          deleteRole();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'View total utilized budget of a department':
          viewBudgetByDepartment();
          break;
        case 'Exit':
          console.log('Goodbye!');
          sequelize.close(); // Use close instead of end
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  departmentFunctions.getAllDepartments().then(([departments]) => {
    console.table(departments);
    displayMainMenu();
  });
}

// Function to view all roles
function viewAllRoles() {
  roleFunctions
    .getAllRoles()
    .then((roles) => {
      if (roles.length === 0) {
        console.log('No roles found.');
      } else {
        console.table(roles);
      }
      displayMainMenu();
    })
    .catch((error) => {
      console.error('Error retrieving roles:', error);
      displayMainMenu();
    });
}

// Function to view all employees
function viewAllEmployees() {
  employeeFunctions.getAllEmployees().then(([employees]) => {
    console.table(employees);
    displayMainMenu();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      departmentFunctions.createDepartment(answers.name).then(() => {
        console.log('Department added!');
        displayMainMenu();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      roleFunctions.createRole(answers.title, answers.salary, answers.department_id).then(() => {
        console.log('Role added!');
        displayMainMenu();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID for the employee:',
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID for the employee (leave empty if none):',
      },
    ])
    .then((answers) => {
      employeeFunctions
        .createEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id)
        .then(() => {
          console.log('Employee added!');
          displayMainMenu();
        });
    });
}

// Function to update an employee's role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the ID of the employee to update:',
      },
      {
        type: 'input',
        name: 'new_role_id',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      employeeFunctions.updateEmployeeRole(answers.employee_id, answers.new_role_id).then(() => {
        console.log('Employee role updated!');
        displayMainMenu();
      });
    });
}

// Function to delete a department
function deleteDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the ID of the department to delete:',
      },
    ])
    .then((answers) => {
      const departmentId = parseInt(answers.department_id);
      departmentFunctions.deleteDepartment(departmentId).then(() => {
        console.log('Department deleted!');
        displayMainMenu();
      });
    });
}

// Function to delete a role
function deleteRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the ID of the role to delete:',
      },
    ])
    .then((answers) => {
      const roleId = parseInt(answers.role_id);
      roleFunctions.deleteRole(roleId).then(() => {
        console.log('Role deleted!');
        displayMainMenu();
      });
    });
}

// Function to delete an employee
function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the ID of the employee to delete:',
      },
    ])
    .then((answers) => {
      const employeeId = parseInt(answers.employee_id);
      employeeFunctions.deleteEmployee(employeeId).then(() => {
        console.log('Employee deleted!');
        displayMainMenu();
      });
    });
}

// Function to view total utilized budget of a department
function viewBudgetByDepartment() {
  departmentFunctions.getAllDepartments().then(([departments]) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'department_id',
          message: 'Select a department to view its budget:',
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then((answers) => {
        const departmentId = answers.department_id;
        departmentFunctions.getDepartmentBudget(departmentId).then(([result]) => {
          const totalBudget = result[0].total_budget;
          console.log(`Total Utilized Budget of the Department: $${totalBudget}`);
          displayMainMenu();
        });
      });
  });
}

// Start the application
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
    displayMainMenu();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });
