const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : 'Username is required!'
    },

    email:{
        type: String,
        required:'Email is required!'
    },

    password:{
        type: String,
        required:'Password is required!!'
     },
     retypepassword:{
        type: String,
        required:'Password is not the same as the other!!'
     },
 },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('User', userSchema);