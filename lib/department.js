const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')

// DEPARTMENT PROMPTS START
const addDeptPrompt = [
  {
    type: 'input',
    name: 'deptTitle',
    message: 'Enter the name of the department to add.',
    validate: deptTitleInput => {
      if (deptTitleInput) {
        return true
      } else {
        console.log('Please enter the new department\'s name.')
      }
    }
  }
]
// DEPARTMENT PROMPTS END

class Department {
  // View all departments
  static viewAllDepts () {
    

    const sql = `SELECT * FROM department
                  ORDER BY name ASC`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }

  // add a deparment
  static addDept () {
    
    inquirer
      .prompt(addDeptPrompt)
    
      
      .then((addDeptResponse) => {
        const sql = `INSERT INTO department (name)
                      VALUES (?)`
        const params = [addDeptResponse.deptTitle]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.table(`The ${params} department has been added.`)
          mainMenu.mainMenu()
        })
      })
  }

  

  static getDepartments () {
    return new Promise(resolve => {
      const sql = `SELECT * FROM department`

      connection.query(sql, (error, results) => {
        if (error) throw error
        const deptList = results.map((data) => data.id + ' ' + data.name)
        // console.log(deptList)
        resolve(deptList)
      })
    })
  }

  
}

module.exports = Department