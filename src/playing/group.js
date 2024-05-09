
const EVENT_NAME = require('../constant/eventName');
const groupController = require('../controller/groupController');
const { sendToSocketEmitter } = require('../eventEmitter');
const Group = require('../model/groupmodel')

const group = async (data, socket) => {

    try {
        // console.log('Group Event ====', data)

        let groupData = {
            name: data.data.group_name,
            adminId: data.data.userId,
            members: data.data.selectedUser
        }


        let existingGroup = await Group.findOne({ name: data.data.group_name });
        // console.log('find group =',existingGroup)
        if (existingGroup) {
            data = {
                eventName: EVENT_NAME.GROUP,
                data: {
                    message: 'please enter group name unique'
                }
            }
            return sendToSocketEmitter(socket.id, data)
        }

        let group = await groupController.createGroup(groupData, socket.id);
        // console.log('groupdata index file==', groupData)
        groupData = await groupController.findGroup(group);
        // console.log('groupData ===',groupData)
        if(!groupData){
            data = {
                eventName:EVENT_NAME.GROUP,
                data:{
                    message :'Group data is not found'
                }
            }
            return sendToSocketEmitter(socket.id,data)
        }
        let groupAllData = groupData. groupData
        data = {
            eventName:EVENT_NAME.GROUP,
            data:{groupAllData}
        }
         return sendToSocketEmitter(groupData.socketIdArray,data)


    } catch (error) {
        console.log('group create Error :', error.message)
    }
}

module.exports = group