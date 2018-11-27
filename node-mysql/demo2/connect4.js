// 4. 一次插入多行

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

// insert statment
let stmt = `INSERT INTO todos(title,completed)  VALUES ?  `

let todos = [
    ['Insert multiple rows at a time', false],
    ['现在学习一次插入多行记录(by www.yiibai.com)', true],
    ['It should work perfectly', true]
]

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
  if (err) {
    return console.error(err.message)
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows)
})

// close the database connection
connection.end()