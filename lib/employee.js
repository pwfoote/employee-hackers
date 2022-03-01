const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')
const Role = require('./role')

class Employee {
  // View all Employees
  viewAllEmployees () {
    

    
    const sql = `SELECT employee.id AS ID,
                  CONCAT_WS(', ', employee.last_name, employee.first_name) AS 'Employee Name',
                  role.title AS 'Job Title',
                  role.salary AS Salary,
                  department.name AS Department,
                  CONCAT_WS(', ', manager.last_name, manager.first_name) AS Manager
                  FROM employee
                  LEFT JOIN role
                  ON employee.role_id = role.id
                  LEFT JOIN department
                  ON role.department_id = department.id
                  LEFT JOIN employee manager
                  ON employee.manager_id = manager.id
                  ORDER BY employee.last_name ASC`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }

   async addEmployee () {
    const currentRoles = await Role.getRoles()
    const currentMgrs = await Employee.getManagers()
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'empFirstName',
          message: 'Enter new employee FIRST name.',
          validate: empFirstNameInput => {
            if (empFirstNameInput) {
              return true
            } else {
              console.log('Please enter the new employees first name.')
            }
          }
        },
        {
          type: 'input',
          name: 'empLastName',
          message: 'Enter new employee LAST name.',
          validate: empLastNameInput => {
            if (empLastNameInput) {
              return true
            } else {
              console.log('Please enter the new employee last name.')
            }
          }
        },
        {
          type: 'list',
          name: 'empRole',
          message: 'Select new employees role.',
          choices: currentRoles
        },
        {
          type: 'list',
          name: 'empMgr',
          message: 'Select new employees manager (if not applicable, select N/A).',
          choices: currentMgrs
        }
      ])
      .then((addEmpResponse) => {
        if (addEmpResponse.empMgr === 'N/A, this employee is a manager.') {
          
          addEmpResponse.empMgr = null
        }
        const roleId = addEmpResponse.empRole.split(' ')
        let mgrId = ''
        if (addEmpResponse.empMgr !== null) {
          const splitMgrId = addEmpResponse.empMgr.split(' ')
          mgrId = splitMgrId[0]
        } else {
          mgrId = null
        }
    
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`

        const params = [
          addEmpResponse.empFirstName,
          addEmpResponse.empLastName,
          roleId[0],
          mgrId
        ]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.log(`Employee ${params[0]} ${params[1]} was added.`)
          mainMenu.mainMenu()
        })
      })
  }

  //add 'Delete employee'

   async updateEmployeeRole () {
    const empList = await Employee.getEmployees()
    const roleList = await Role.getRoles()
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'currentEmp',
          message: 'Select an employee to update their role.',
          choices: empList
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'Select the new role for this employee.',
          choices: roleList
        }
    
      ])
      .then((updateEmpRoleResponse) => {
      

        // isolate employee id value
        const updateEmpId = updateEmpRoleResponse.currentEmp.split(' - ')
        // isolate role id value
        const updateRoleId = updateEmpRoleResponse.newRole.split(' ')
       

        const sql = `UPDATE employee SET role_id = ?
                      WHERE id = ?`

        const params = [ updateRoleId[0], updateEmpId[0] ]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.log(`Employee role updated.`)
          mainMenu.mainMenu()
        })
      })
  }


   getManagers () {
    return new Promise(resolve => {
      const sql = `SELECT * FROM employee
                    WHERE manager_id IS NULL`

      connection.query(sql, (error, results) => {
        if (error) throw error
        const mgrList = results.map((data) => data.id + ' ' + data.first_name + ' ' + data.last_name)
        // add an option to select no manager
        mgrList.push('N/A, this employee is a manager.')
        /
        resolve(mgrList)
      })
    })
  }

  static getEmployees () {
    return new Promise(resolve => {
      const sql = `SELECT employee.id AS ID,
                    CONCAT_WS(', ', employee.last_name, employee.first_name) AS 'Employee Name',
                    role.title AS 'Job Title'
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    ORDER BY employee.last_name ASC`

      connection.query(sql, (error, results) => {
        if (error) throw error

        const empList = results.map((data) => data['ID'] + ' - ' + data['Employee Name'] + ' - ' + data['Job Title'])
     
        resolve(empList)
      })
    })
  }
}

module.exports = Employee