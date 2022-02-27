const inquirer = require('inquirer')
const Department = require('./department')

// MENU PROMPT START
const menuPrompt = [
  {
    type: 'list',
    name: 'menu',
    message: 'Select an option',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role'
    ]
  }
]
// MENU PROMPT END

const app = () => {
  mainMenu()
}

const mainMenu = () => {
  inquirer
    .prompt(menuPrompt)
    .then(({ menu }) => {
      
      switch (menu) {
        case 'View all departments':
          // call SQL query for all departments
          console.log('View all departments chosen.')
          Department.viewAllDepts()
          break
        case 'View all roles':
          // call SQL query for all roles
          console.log('View all roles chosen.')
          break
        case 'View all employees':
          // call SQL query for all employees
          console.log('View all employees chosen.')
          break
        case 'Add a department':
          // function prompt user for department name
          // SQL query to add department 
          console.log('Add department chosen.')
          break
        case 'Add a role':
          // function prompt user for name, salary, and department for role
          // SQL query to add role to database
          console.log('Add role chosen.')
          break
        case 'Add an employee':
          // function prompt user for first name, last name, role, and manager of employee
          // SQL query to add employee to database
          console.log('Add employee chosen.')
          break
        case 'Update an employee role':
          //  prompt list for employee
          // prompt user to enter new role for selected employee
          // call SQL query to update employee role in database
          console.log('Update employee role chosen.')
      }
    })
}

module.exports = app