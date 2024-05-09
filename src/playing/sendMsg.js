
const EVENT_NAME = require('../constant/eventName')
const chatController = require('../controller/chatController')
const groupController = require('../controller/groupController')
const { sendToSocketEmitter } = require('../eventEmitter')

const sendMsg = async (data,socket) => {
    console.log(' SEND_MSG event =', data)
    try {

        const chatObj = {
            sender: data.data.userId,
            receiver: data.data.receiver,
            msg: data.data.message
        }

        // console.log('chat Object==',chatObj)


        let groupData = await groupController.findOneGroup({ _id: data.data.receiver })
        // console.log('groupData ====', groupData)

        if (groupData) {

            let allSender = await groupController.leaveGroup({ sender: data.data.userId })
            // console.log('all sender===', allSender)
           

            allSender.forEach(async (element) => {
                await socket.leave(element._id.toString())
            });

            await socket.join(chatObj.receiver)
           let groupSendMsg =  await chatController.groupChat(chatObj, socket.id);
        //    console.log('group send message===',groupSendMsg)

           if(!groupSendMsg) {
            data = {
                eventName : EVENT_NAME.SEND_MSG,
                data:{message:'data is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
           }

             data = {
            eventName : EVENT_NAME.SEND_MSG,
            data : { groupchat: true, message: "Ok", groupSendMsg }

           }

           return sendToSocketEmitter(chatObj.receiver,data)

        } else {
            let ChatData = await chatController.chat(chatObj, socket.id);
            if (!ChatData) {

                data = {
                    eventName:EVENT_NAME.SEND_MSG,
                    data:{
                        message:"Data is not found"
                    }
                }
                return sendToSocketEmitter(socket.id,data)
            }

            let sendMsg = await chatController.chat(chatObj, socket.id);
                // console.log('send msg data log ::::::::::',sendMsg)
                let chatData = sendMsg.ChatData
                data = {
                    eventName:EVENT_NAME.SEND_MSG,
                    data:{chatData}
                }
                return sendToSocketEmitter(sendMsg.msgSocketId,data)
        }
    } catch (error) {
        console.log('send message event Error:',error.message)
    }

}

module.exports = sendMsg