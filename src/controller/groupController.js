const Chat = require('../model/chatmodel');
const Group = require('../model/groupmodel');


module.exports = {
    
    /* 
    GROUP MODEL FUNCTION
    
    */
    createGroup: async (data, socketId) => {

        const { name, adminId, members } = data;
        try {
            console.log('create Group ===',data)
            let existingGroup = await Group.findOne({ name: data.name });
            // console.log('find group =',existingGroup)
            if (existingGroup) {
                return io.to(socketId).emit('GROUP', { message: 'please enter group name unique' })
            }
            let groupData = await Group.create({
                name,
                adminId,
                members
            }
            );
            return groupData;

            // return groupData;
        } catch (error) {
            console.log(error)
        }
    },

    findGroup: async (data) => {

        try {
            let groupId = data._id;
            // console.log('group id ===',groupId)
            const groupData = await Group.findById(groupId).populate('members');
            // console.log('user group data ===', groupData);
            let socketIdArray = [];
            groupData.members.forEach(element => {
                // console.log('all member data ===',element)
                // console.log('all member socketId ===',element.socketId)
                socketIdArray.push(element.socketId);
                // io.to(element.socketId).emit('GROUP', { message: "Ok", groupData })
            })
            return data = {
                socketIdArray,groupData
            }


        } catch (error) {
            console.log(error.message)
        }
    },

    findAllGroup: async (userId) => {

        try {

            const groups = await Group.find({ members: userId }).populate('members');
            return groups;


        } catch (error) {
            console.log(error.message)
        }
    },

    deleteGroup: async (groupId) => {

        try {
            console.log('group Id ==', groupId)

            if(!groupId){
                console.log('group Id is not found')
            }
            const groups = await Group.findByIdAndDelete(groupId);
            return groups;
            // console.log('DELETE  GROUP EVENT==',groups)
           
        } catch (error) {
            console.log(error.message)
        }
    },
    findOneGroup: async (data) => {

        try {
            // console.log('findOneGroup ======', data)
            let groupId = data._id;
            const groupData = await Group.findById(groupId)
            return groupData
            // console.log('user group data ===', groupData);

        } catch (error) {
            console.log(error.message)
        }
    },
    leaveGroup : async (data) =>{
        try {
            console.log('leave group data====',data)
            let allSender = await Group.find({
                $or: [
                    { members: data.sender } 
                ]
            })
            return allSender;
        } catch (error) {
            console.log(error.message)
        }

    }
    


}