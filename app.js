const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Setup Cross Origin
app.use(require("cors")());

app.use("/user", require("./routes/users"));
app.use("/chatroom", require("./routes/chatrooms"));


const errorHandlers = require("./Handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if(process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
} else{
    app.use(errorHandlers.productionErrors);
}





module.exports = app;