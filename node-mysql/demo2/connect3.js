// 3. 插入一行并返回插入的ID

let mysql = require('mysql')
let config = require('../config.js')
let connection = mysql.createConnection(config)

// 要将数据传递给SQL语句，请使用问号(?)作为占位符。
let stmt = `INSERT INTO todos(title,completed)
            VALUES(?,?)`

let todo = ['Insert a new row with placeholders', false]

// execute the insert statment
connection.query(stmt, todo, (err, results, fields) => {
  if (err) {
    return console.error(err.message)
  }
  // get inserted id
  console.log('Todo Id:' + results.insertId)
})

connection.end()