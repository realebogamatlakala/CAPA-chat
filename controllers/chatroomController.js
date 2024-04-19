const mongoose = require("mongoose");
const Chatroom = require("../models/Chatroom");
const jwt = require('jsonwebtoken');

// exports.createChatroom = async (req, res) => {
    
//     const { room } = req.body;

//     const chatroomRegex = /^[A-Za-z\s]+$/;
//     if(!chatroomRegex.test(room)) throw "Chatroom can only contain letters and not numbers!";

//     const chatroomExists = await Chatroom.findOne({room});


//     if(chatroomExists) throw "Chatroom with the name already exists!";

//     const chatroom  = new Chatroom({
//         room,
//     });

//     await room.save();

//     res.json({
//         message: "Chatroom created!"
//     })

// };

exports.createChatroom = async (req, res) => {
    const { room } = req.body;
    const chatroomRegex = /^[A-Za-z\s]+$/;

    if (!chatroomRegex.test(room)) {
        throw new Error("Chatroom can only contain letters and spaces!");
    }

    const chatroomExists = await Chatroom.findOne({ room });

    if (chatroomExists) {
        throw new Error("Chatroom with the name already exists!");
    }

    const chatroom = new Chatroom({
        room
    });

    try {
        await chatroom.save();
        res.json({
            message: "New Chatroom " + room + " created successfully!"
        });
    } catch (error) {
        console.error("Error creating chatroom:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};