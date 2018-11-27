// 3. 防止SQL注入

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

// let id = process.argv[2] // pass argument to query
let id = 5
let sql = `SELECT * FROM todos WHERE id=` + mysql.escape(id)

connection.query(sql, (err, results, fields) => {
    if (err) {
        return console.error(err.message)
    }
    console.log(results)
})

connection.end()