const setUserName = require('../playing/setUser')
const userList = require('../playing/userList')
const chatHistory = require('../playing/chatHistory')
const sendMsg = require('../playing/sendMsg')
const search = require('../playing/search')
const makeGroup = require('../playing/makeGroup')
const group = require('../playing/Group')
const groupList = require('../playing/groupList')
const deleteGroup = require('../playing/deleteGroup')
const EVENT_NAME = require('../constant/eventName')
const eventHandler = async(socket) =>{

    try {
        

        socket.onAny((eventName,data)=>{
            console.log(`event name is ${eventName} ::: data ===${JSON.stringify(data)}`)
            switch (eventName) {
                case EVENT_NAME.SET_USER_NAME:
                    setUserName(data.data,socket)
                    break;

                case EVENT_NAME.USER_LIST:
                    userList(data,socket)
                    break;
            
                case EVENT_NAME.CHAT_HIS:
                    chatHistory(data,socket)
                    break;

                case EVENT_NAME.SEND_MSG:
                    sendMsg(data,socket)
                    break;

                case EVENT_NAME.SEARCH_ITEM:
                    search(data,socket)
                    break;
                    
                case EVENT_NAME.MAKE_GROUP:
                    makeGroup(data,socket)
                    break;

                case EVENT_NAME.GROUP:
                    group(data,socket)
                    break;

                case EVENT_NAME.GROUP_LIST:
                    groupList(data,socket)
                    break;

                case EVENT_NAME.DELETE_GROUP:
                    deleteGroup(data,socket)
                    break;

                default:
                    break;
            }
        })

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = eventHandler