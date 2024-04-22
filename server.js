require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once('open',() => {
    console.log("MongoDB Connected Successfully!")
});

require("./models/User");
require("./models/Messages");
require("./models/Chatroom");

const httpServer = require("http").createServer(app); // Create HTTP server
const io = require("socket.io")(httpServer, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
});

const jwt = require("jwt-then");
const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next();
    } catch (err) {
        next(new Error('Authentication error')); // Pass error to middleware error handler
    }
});

io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });

    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("A user joined chatroom: " + chatroomId);
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("A user left chatroom: " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        if (message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.userId });
            const newMessage = new Message({
                chatroom: chatroomId,
                user: socket.userId,
                message,
            });
            io.to(chatroomId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
            });
            await newMessage.save();
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});