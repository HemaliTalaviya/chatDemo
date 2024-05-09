const eventHandler = require("../eventHandler")
const disConnect = require("../playing/disconnect")

const socketConnection = () => {
    try {

        io.on('connection', async (socket) => {
            console.log('user connected...' + socket.id)

            await eventHandler(socket)

            socket.on('disconnect',()=>{
                disConnect(socket);
            })
        })

    } catch (error) {
        console.log(error.message)
    }

}

module.exports = socketConnection