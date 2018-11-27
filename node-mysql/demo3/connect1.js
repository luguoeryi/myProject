// 1. 执行一个简单的查询

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

let sql = `SELECT * FROM todos`

connection.query(sql, (err, results, fields) => {
    if (err) {
        return console.error(err.message)
    }
    console.log(results)
})

connection.end()