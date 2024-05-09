const EVENT_NAME = require("../constant/eventName");
const { sendToSocketEmitter } = require("../eventEmitter");
const groupController = require('../controller/groupController')


const groupList = async(data,socket) =>{
    try {
        // console.log('groupList event===',data)
        let allGroup = await groupController.findAllGroup(data.data.userId);
        // console.log('group=====',allGroup);

        if(!allGroup){
            data ={
                eventName:EVENT_NAME.GROUP_LIST,
                data:{message:'group data is not found'}
            }
            return sendToSocketEmitter(socket.id,data)
        }
        data = {
            eventName:EVENT_NAME.GROUP_LIST,
            data:{allGroup}
        }
        return sendToSocketEmitter(socket.id,data)

        
    } catch (error) {
        console.log('groupList Error::',error.message)
    }
}

module.exports = groupList;