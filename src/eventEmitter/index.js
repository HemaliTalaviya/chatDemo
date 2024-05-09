
const sendToSocketEmitter = (socketId,data) =>{
    try {
        console.log(`sendTosocketEmitter data ==== ${JSON.stringify(data)}  socketID:====${JSON.stringify(socketId)}`)

        io.to(socketId).emit(data.eventName,data)
        
    } catch (error) {
        console.log('sendTosocketEmitter Error :::::',error.message)
    }
}
    
const sendToALLSocketEmitter = (socketId,data) =>{
    console.log(`sendToALLSocketEmitter==== ${JSON.stringify(socketId)} data==========${JSON.stringify(data)}` );
    try {
        io.emit(data.eventName,data)
    }catch(error){
        console.log('sendToALLSocketEmitter Error',error.message);
    }
}

module.exports =  {sendToSocketEmitter,sendToALLSocketEmitter}
   
    // sendToALLSocketEmitter
