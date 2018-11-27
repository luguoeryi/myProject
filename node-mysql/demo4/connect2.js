// 2. 删除数据示例

let mysql = require('mysql')
let config = require('../config.js')

let connection = mysql.createConnection(config)

let sql = `DELETE FROM todos WHERE id = ?`

connection.query(sql, 1, (err, results, fields) => {
    if (err) {
        return console.error('err message: ' + err.message)
    }
    console.log('Deleted Row(s):', results.affectedRows)
})

connection.end()