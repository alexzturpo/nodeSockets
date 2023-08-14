module.exports = io =>{
    console.log('Archivo socket fue cargado')
    let messages = []
    io.on('connection', (socket)=>{
        console.log('usuario conectado')
        io.emit('messages',messages)
        socket.broadcast.emit('new_user','Nuevo usuario conectado.')
        socket.on('escribiendo', user => {
            socket.broadcast.emit('userEscribiendo',user)
        })
        socket.on('message',data => {
            messages.push(data)
            io.emit('messages',messages)
            console.log('CHAT: ',messages)
        })
        socket.on('disconnect',()=>{
            console.log('usuario desconectado')

        })
    })
}