const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const cors = require("cors");
const connectDB = require("./lib/db.js");

//Socket.io 
const socket = require("socket.io");
const socketServer = socket.Server;

const userControllers = require("./controllers/userController.js");
const messageControllers = require("./controllers/messageController.js");
const isAuth = require("./customMiddlewares/isAuth.js");

dotenv.config({});
connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

//Initalize socket.io server
const io = new socketServer(server, {
    cors : {origin:"*"}
});

//Store online users
const userSocketMap = {/*userId : socketId*/}

//socket connection handler
io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;
    console.log("user Connected-", userId);

    if(userId)
    {
        userSocketMap[userId] = socket.id;
    }

    //Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap) );

    socket.on("disconnect", () => {
        console.log("User disconnected", userId);
        delete userSocketMap[userId]; //delete userId property in userSocketMap object
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

});


//Middlewares
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req,res)=> {

    res.send("Server is live");

});

//Authentication routes
app.post("/signup", userControllers.signUp);
app.post("/login", userControllers.login);
app.put("/update-profile", isAuth, userControllers.updateProfile);
app.get("/check", isAuth, userControllers.checkAuth);

//Messages routes
app.get("/users", isAuth, messageControllers.getUsersForSidebar);
app.get("/messages/:id", isAuth, messageControllers.selectedUserMessages);
app.put("/mark/:id", isAuth, messageControllers.markMessageAsSeen);
app.post("/send/:id", isAuth, messageControllers.sendMessage);

//Server Started
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {io, userSocketMap}