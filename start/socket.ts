import Ws from 'App/Services/Ws'
Ws.boot()

Ws.io.on('connection', (socket) => {
    console.log('User Connected!')
    socket.on('disconnect', () => {
        console.log('User Disonnected!')
    })
})

Ws.io.on('error', () => {
    console.log(`Socket Error!`);
})