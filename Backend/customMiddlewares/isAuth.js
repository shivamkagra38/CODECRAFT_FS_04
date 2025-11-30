const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel.js");

const isAuth = async (req, res , next) => {

    try
    {
        const token = req.headers.token;

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findById(decode.userId).select("-password");

        if(!user)
        {
            return res.status(400).json({success:false, message:"User not found"});
        }

        req.user = user;
        next();
    }
    catch(error)
    {
        res.status(400).json({success:false, message:"User not authenticated"});
        console.log("Error while authenticating user");
    }
}

module.exports = isAuth;