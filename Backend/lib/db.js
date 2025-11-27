const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const userModel = require("../models/UserModel.js");

//Connect to db
const connectDB = async () => {

    try
    {
        //listeing to connection event
        mongoose.connection.on("connected", () => {
            console.log("DB connection Established.");
        });

        //Requesting connection
        const response = await mongoose.connect(process.env.MONGODB_URI);
    }
    catch(error)
    {
        console.log(error);
    }

}

module.exports = connectDB;
