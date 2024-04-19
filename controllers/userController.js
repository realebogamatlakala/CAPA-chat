const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {

    const { username, email, password , retypepassword} = req.body;
    const emailRegex = /[@gmail.com | @yahoo.com | @hotmail.com | @live.com]$/;



    if(!emailRegex.test(email)) throw "Email is not supported from your domain!";
    if(password.length < 6 ) throw "Password should be more than 6 characters long!";

    const userExists = await User.findOne({
        email,
    });

    if(userExists) throw "User with the same address already exists!"
    const user = new User({username, email, password: (password + process.env.SALT), retypepassword
    });

    await user.save();

    res.json({
        message: "New Profile "+ username +" registered successfully!",
    })
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email, password: (password + process.env.SALT),
    });
    
    if(!user) throw "Email address and Passwords did not match any existing profile!"

    const token = await jwt.sign({id: user.id}, process.env.SECRET);
    
    res.json({
        message: "User logged in successfully!",
        token
    });

};
