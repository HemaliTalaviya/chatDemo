const EVENT_NAME = require('../constant/eventName');
const userController = require('../controller/userController');
const  {sendToALLSocketEmitter} = require('../eventEmitter');


const userList = async(data,socket) =>{

    // console.log('userlist function ====',data,socket.id)
    try {
        let userData = await userController.findAllData();
        // console.log('userName Data==',userData)
        let users = [];
        userData.forEach((allData) => {
            users.push(allData);
        })
        data = {
            eventName : EVENT_NAME.USER_LIST,
            data:{
                users
            }
        }
    
        return sendToALLSocketEmitter(socket.id,data)
    } catch (error) {
        console.log('userList Error:',error.message)
    }
       
}



module.exports = userList