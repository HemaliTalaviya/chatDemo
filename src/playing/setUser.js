

// const EVENT_NAME = require('../constant/eventName')
const userController = require('../controller/userController')
const EVENT_NAME = require("../constant/eventName")
const {sendToSocketEmitter} = require("../eventEmitter")

const setUserName = async (data,socket) =>{

    // console.log(`set user name event ===${JSON.stringify(data)}  socket id:::====${socket.id}`)
    try {
        
        let {name} = data
        // console.log('userData name====',name)

        if(!name){
            data = {
                eventName :EVENT_NAME.SET_USER_NAME,
                data:{
                    message:"please enter valid name"
                },
                
            }
           return sendToSocketEmitter(socket.id,data) 
        }

        let userData = {
            name: name,
            socketId: socket.id
        }

        userData = await userController.createUSer(userData)
        // console.log('userData id====',userData)

        socket.userId = userData._id.toString()
        

        data = {
            eventName:EVENT_NAME.SET_USER_NAME,
            data:{userId :socket.userId}
            
        }

        return sendToSocketEmitter(socket.id,data)
        
    } catch (error) {
        console.log('set user name event =',error.message)
    }
}

module.exports = setUserName