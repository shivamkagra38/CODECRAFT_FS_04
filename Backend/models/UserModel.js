const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        required:true,
    }

},{timestamps:true});

const users = mongoose.model("users", userSchema);

module.exports = users;