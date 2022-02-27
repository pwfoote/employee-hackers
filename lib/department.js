const cTable = require('console.table')
const connection = require('../db/connection')
const mainMenu = require('../server')

class Department {
  // View all departments
  static viewAllDepts () {
    console.log('Veiwing All Departments')
   
    const sql = `SELECT * FROM department`

    connection.query(sql, (error, results) => {
        if (error) {
          console.log(error)
          return
        }
        console.table(results)
        mainMenu.mainMenu()
      })
  
    
    }
  }
  

module.exports = Department