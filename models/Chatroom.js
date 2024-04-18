const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    chatroom:{
        type: String,
        required : 'Chatroom name is required!'
    },
});

module.exports = mongoose.model('Chatroom', chatroomSchema);