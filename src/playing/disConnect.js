
const usercontroller = require('../controller/userController');
const disConnect = async (socket) =>{
    try {
        
        await usercontroller.updateUser({ condition: { _id: socket.userId }, updateData: { $set: { socketId: "" } } })
    } catch (error) {
        console.log('disconnect Error :',error.message)
    }
}

module.exports = disConnect