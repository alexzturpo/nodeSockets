const socketio = require('socket.io')
const express = require('express')
const app = express()
const path = require('path')

const http = require('http');
const server = http.createServer(app);
const io = socketio(server)
// const io = new Server(server);
// console.log('IO : ',io)

app.set('port', 3000)
app.use(express.static(path.join(__dirname, 'public')))

require('./socket')(io)

server.listen(app.get('port'), ()=>{
    console.log(`APP run port : ${app.get('port')}`)
})