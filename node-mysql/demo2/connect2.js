// 2. nodejs 将一行数据插入表中

let mysql = require('mysql')
let config = require('../config.js')
let connection = mysql.createConnection(config)

// insert statment
let sql = `INSERT INTO todos(title, completed)
            VALUES('learm how to insert a new row', true)`

// insert statment
connection.query(sql)

connection.end()