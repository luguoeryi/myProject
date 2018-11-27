// 2. 将数据传递给查询

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

let sql = `SELECT * FROM todos WHERE completed=?`

connection.query(sql, [true], (err, results, fields) => {
    if (err) {
        return console.error(err.message)
    }
    console.log(results)
})

connection.end()