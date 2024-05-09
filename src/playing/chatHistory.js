const EVENT_NAME = require('../constant/eventName')
const chatController = require('../controller/chatController')
const groupController = require('../controller/groupController')
const { sendToSocketEmitter } = require('../eventEmitter')

const chatHistory = async(data,socket) =>{
    // console.log('chatHistory function ==',data,socket.id)
    try {
        let groupData = await groupController.findOneGroup({ _id: data.data.receiver })
        if (groupData) {
            let allSender = await groupController.leaveGroup(data.data)

            console.log('all sender===', allSender)
             allSender.forEach(async(element)=> {
                await socket.leave(element._id.toString())
            });
           
            await socket.join(data.data.receiver)
          
           let Chat =  await chatController.findGroupChat({ receiver: data.data.receiver }, socket.id)
        //    console.log('group chat receiver chat history ===',Chat)


           if(!Chat){
            data = {
                eventName : EVENT_NAME.CHAT_HIS,
                data:{message :'chat Data is not found'}
               }
               return sendToSocketEmitter(socket.id,data)
           }
           data = {
            eventName : EVENT_NAME.CHAT_HIS,
            data:{ groupchat: true, message: "Ok", Chat}
           }

           return sendToSocketEmitter(socket.id,data)
        //    io.to(socketId).emit('CHAT_HIS', { groupchat: true, message: "Ok", chatData })

        } else {
           let chatHis =  await chatController.findChat({ receiverId: data.data.receiver, userId: socket.userId }, socket.id);
        //    console.log('chat history data ===',chatHis)

           data = {
                eventName : EVENT_NAME.CHAT_HIS,
                data:{Chat:chatHis.chatData}
           }
           return sendToSocketEmitter(chatHis.socketIdArray,data)
        }

    } catch (error) {
        console.log('chatHistory Error :::',error.message);
    }
}

module.exports = chatHistory