var ws = require('nodejs-websocket');

var server = ws.createServer(function (conn) {
    console.log('new connection')
    conn.on('text', function (str) {
        console.log('Received '+ str)
        conn.sendText(str.toUpperCase()+'!!!')
    })
    conn.on('close', function (code, reason) {
        console.log('Connection colsed')
    })
    conn.on('error', function (err) {
        console.log('handle err')
        console.log(err)
    })
}).listen(8001)