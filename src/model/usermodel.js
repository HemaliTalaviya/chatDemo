const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    socketId:{
        type:String
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User