const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Chat = require('../model/chatmodel');
const usermodel = require('../model/usermodel');

module.exports = {
    /* CHAT MODEL */

    chat: async (data, socketId) => {

        try {
            console.log('controller chat===', data,socketId)

            let ChatData = await Chat.create(data);
            // console.log('chat Data===', ChatData)

            let msgId = await Chat.findById(ChatData._id).populate('sender  receiver');
            console.log('msg ID=', msgId)
            if (!msgId) return io.to(socketId).emit('SEND_MSG', { message: 'Data is not found' })

            let msgSocketId = [msgId.sender.socketId,msgId.receiver.socketId]

            return data = { msgSocketId,ChatData}

        } catch (error) {
            console.log(error);
        }
    },
    findChat: async (data,socketId) => {

        try {
            // console.log('find chat log===', data,socketId)
            let receiverId = new mongoose.Types.ObjectId(data.receiverId)
            let sendId = new mongoose.Types.ObjectId(data.userId)

            let chatData = await Chat.find({ $or: [{ "receiver": receiverId, "sender": sendId }, { "sender": receiverId, "receiver": sendId }] });
            let userData = await usermodel.find({ $or: [{ "_id": receiverId, "_id": sendId }]})
            // console.log('chatdataa====', userData)

            if(chatData === 0) return io.to(socketId).emit('CHAT_HIS',{message:'Data is not found'})

            let socketIdArray=[];
            if(userData.length > 0){
                userData.forEach(element => {
                    socketIdArray.push(element.socketId)
                    //  io.to(element.socketId).emit('CHAT_HIS',{message:"Ok",chatData})
                });
            }

            return data = { socketIdArray,chatData}
        } catch (error) {
            return io.to(socketId).emit('CHAT_HIS',{message:error.message})
            // console.log(error);
        }
    },
    groupChat: async (data, socketId) => {

        try {
            console.log('groupChat controller chat===', data)

            let ChatData = await Chat.create(data);

            return ChatData;
        

        } catch (error) {
            console.log(error);
        }
    },

    findGroupChat: async (data, socketId) => {

        try {
            console.log('findGroupChat ======', data)
            const chatData = await Chat.find(data)
            // console.log('chatdata ===', chatData)
            return chatData;
            // console.log('user group data ===', groupData);

        } catch (error) {
            console.log(error.message)
        }
    }
} 