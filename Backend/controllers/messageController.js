const userModel = require("../models/UserModel.js");
const messageModel = require("../models/MessageModel.js");

const cloudinary = require("../lib/cloudinary.js");
const {io,userSocketMap} = require("../index.js");

//Get all users except the loggin in user
const getUsersForSidebar = async (req, res) => {

    try
    {
        const userId = req.user._id;
        const filteredUsers = await userModel.find( {_id: {$ne: userId} }).select("-password");

        //Count number of messages not seen
        const unseenMessages = {};
        const promises = filteredUsers.map( async (user) => {

            const messages = await messageModel.find({senderId: user._id, receiverId: userId, seen:false });

            if(messages.length > 0)
            {
                unseenMessages[user._id] = messages.length;
            }

        } );

        await Promise.all(promises);
        res.status(200).json({success:true, users: filteredUsers, unseenMessages});

    }
    catch(error)
    {
        console.log("Error while getting messages");
        res.status(400).json({success:false, message:"Error while getting messages"});
    }
}


//Get all messages for selected User
const selectedUserMessages = async (req, res) => {

    try
    {
        const myId = req.user._id;
        const selectedUserId = req.params.id;

        const messages = await messageModel.find({

            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId}
            ]

        });

        await messageModel.updateMany({senderId: selectedUserId, receiverId: myId}, {seen:true});

        res.status(200).json({success:true, messages});

    }
    catch(error)
    {
        console.log("Error while getting messages - Selected user API");
        res.status(400).json({success:false, message:"Error while getting messages"});
    }

}


//API to mark messages as seen using message id
const markMessageAsSeen = async (req, res) => {
    
    try
    {
        const messageId = req.params.id;

        await messageModel.findByIdAndUpdate({_id:messageId},{seen:true});

        res.status(200).json({success:true, message:"Message marked as seen"});
    }
    catch(error)
    {
        console.log("Error while marking message as seen");
        res.status(400).json({success:false, message:"Error while marking message as seen"});
    }
}

//Sending Message to a selected User API
const sendMessage = async (req, res) => {

    try
    {
        const myId = req.user._id;
        const receiverId = req.params.id;

        const {messageData} = req.body;

        let imageUrl = "";

        if(messageData.image !== "")
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await messageModel.create({
            senderId: myId,
            receiverId,
            text: messageData.text,
            image: imageUrl
        });

        //console.log(userSocketMap);

        //Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];

        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json({success:true, newMessage});

    }
    catch(error)
    {
        res.status(400).json("Error while sending a message");
        console.log("Error while sening a message");
    }

}

module.exports = {getUsersForSidebar, selectedUserMessages, markMessageAsSeen, sendMessage}