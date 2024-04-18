const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectId,
        required : 'Chatroom name is required!'
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required : 'Chatroom name is required!',
        ref: "User",
    },

    message: {
        type: String,
        required: "Message is required!"
    }
});


module.exports = mongoose.model('Messages', messagesSchema);