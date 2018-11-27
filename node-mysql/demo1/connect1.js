// 1. nodejs 连接mysql

let mysql = require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aa123456',
    database: 'yiibaidb'
})

connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message)
    }
    console.log('Connected to the MySQL server.')
})

//connection.destroy(); 立即强制连接
connection.end(err => {
  if (err) {
    return console.log('error:' + err.message)
  }
  console.log('Close the database connection.')
})