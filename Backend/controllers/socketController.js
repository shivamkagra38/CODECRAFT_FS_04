//Socket.io 
const socket = require("socket.io");
const socketServer = socket.Server;

//Initalize socket.io server
const io = new socketServer(server, {
    cors : {origin:"*"}
});


//Store online users
const userSocketMap = {/*userId : socketId*/}

//socket connection handler
io.on("connection", (socket) => {

    console.log("Socket, ", socket.id);
    const userId = socket.handshake.query.userId;
    console.log("user Connected ", userId);

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

module.exports = {io, userSocketMap};