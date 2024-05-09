
const EVENT_NAME = require('../constant/eventName');
const userController = require('../controller/userController');
const { sendToSocketEmitter } = require('../eventEmitter');
const search = async (data, socket) => {

    // console.log('search data ===', data);
    try {
        const users = await userController.searchUser(data.data.searchData, socket.id);
        // console.log('serach data =====', users)

        if (!users) {
            data = {
                eventName: EVENT_NAME.SEARCH_ITEM,
                data: 'search data is not found'
            }
            return sendToSocketEmitter(socket.id, data)
        } else {
            data = {
                eventName: EVENT_NAME.SEARCH_ITEM,
                data: { users }
            }
            return sendToSocketEmitter(socket.id, data)
        }


    } catch (error) {
        console.log('search user Error :', error.message);
    }
}

module.exports = search