
const EVENT_NAME = require('../constant/eventName');
const groupController = require('../controller/groupController');
const { sendToSocketEmitter } = require('../eventEmitter');
const { sendToALLSocketEmitter } = require('../eventEmitter');
const deleteGroup = async(data,socket) => {

    try {
        // console.log('delete group event===',data.data.groupId);
        if(!data.data.groupId){
            data ={
                eventName : EVENT_NAME.DELETE_GROUP,
                data:{message:'Id is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        let group = await groupController.deleteGroup(data.data.groupId);
        // console.log('delete group==',group)
        data = {
            eventName:EVENT_NAME.DELETE_GROUP,
            data :{group}
        }
        return sendToALLSocketEmitter(socket.id,data)


    } catch (error) {
        console.log('delete Group ===',error.message);
    }
}


module.exports = deleteGroup