const mongoose = require("mongoose");
const User = require("../models/User");



exports.register = async (req, res) => {

    const { username, email, password } = req.body;
    const emailRegex = /[@gmail.com | @yahoo.com | @hotmail.com | @live.com]$/;



    if(!emailRegex.test(email)) throw "Email is not supported from your domain!";
    if(password.length < 6 ) throw "Password should be more than 6 characters long!";

    const user = new User({username, email, password: (password + process.env.SALT),
    });

    await user.save();

    res.json({
        message: "User ["+ username +"] registered successfully!",
    })
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email, password: (password + process.env.SALT),
    });
    
    if(!user) throw "Email address and Passwords did not match any existing users!"

    const token = jwt.sign({id: user.id}, process.env.SECRET);
    
    res.json({
        message: "User logged in successfully!",
        token
    });

};
