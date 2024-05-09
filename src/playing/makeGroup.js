
const EVENT_NAME = require('../constant/eventName');
const chatController = require('../controller/chatController');
const { sendToSocketEmitter } = require('../eventEmitter');
const makeGroup = async (data,socket) => {

    try {
        // console.log('MAKE_GROUP==', data)
        const allUserData = await chatController.findAllUser();
        // console.log('all user data make group ===', allUserData)

        if (!allUserData) {

            data = {
                eventName:EVENT_NAME.MAKE_GROUP,
                data:{
                     message: "Something wen't wrong !!!" 
                }
            }
            return sendToSocketEmitter(socket.id,data)
        }
        
        data = {
            
            eventName:EVENT_NAME.MAKE_GROUP,
            data:{message:"Ok",allUserData}
        }
        return sendToSocketEmitter(socket.id,data)
    } catch (error) {
        console.log('make Group Error:', error.message);
    }
}

module.exports = makeGroup