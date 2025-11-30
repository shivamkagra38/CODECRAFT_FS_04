const userModel = require("../models/UserModel.js");
const bcryptjs = require("bcryptjs");
const generateToken = require("../lib/utils.js");
const cloudinary = require("../lib/cloudinary.js");

//Sign up 
const signUp = async (req, res) => {

    const{fullname, email, password, bio} = req.body;

    try
    {
        if(!fullname || !email || !password || !bio)
        {
            res.status(401).json({success:false, message:"missing details"});
            return;
        }

        const user = await userModel.findOne({email});

        if(user)
        {
            return res.status(401).json({success:false, message:"Account already Exists"});
        }

        const encryptedPassword = bcryptjs.hashSync(password);
        const newUser = await userModel.create({fullname,email,password:encryptedPassword,bio});

        const token = generateToken(newUser._id);

        res.status(200).json({success:true, message:"Sign up Successful", newUser, token});

    }
    catch(error)
    {
        res.status(400).json({success:false, message:"Error while signing up"});
        console.log("Error while signing up");
    }

}

//Log in
const login = async (req, res) => {

    const{email, password} = req.body;

    if(!email || !password)
    {
        return res.status(400).json({success:false, message:"All filed are required"});
    }

    try
    {
        const current_user = await userModel.findOne({email});

        const isPasswordCorrect = await bcryptjs.compareSync(password, current_user.password);

        if(!isPasswordCorrect)
        {
            return res.status(400).json({success:false, message:"Wrong Password"});
        }

        const token = generateToken(current_user._id);

        res.status(200).json({success:true, message:"login Successful", current_user, token});
    }
    catch(error)
    {
        res.status(400).json({success:false, message:"Error while logging in"});
        console.log("Error while loggin in");
    }

}

//Authentication checking controller
const checkAuth = (req, res) => {
    req.status(200).json({success:true, message:"Authentication Successful", user:req.user});
}

//User profile
const updateProfile = async (req, res) => {

    try
    {
        const {profilePic, bio, fullname} = req.body;
        const userId = req.user._id;

        let updatedUser;

        if(!profilePic)
        {
           updatedUser =  await userModel.findByIdAndUpdate(userId, {bio,fullname}, {new:true});
        }
        else
        {
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser =  await userModel.findByIdAndUpdate(userId, {profilePic:upload.secure_url,bio,fullName}, {new:true});
        }

        res.status(200).json({success:true, message:"Profile updated successfully", user:updatedUser});
    }
    catch(error)
    {
        console.log("Error while updating profile ");
        res.status(400).json({success:false, message:"Error while updating profile"});
    }

}

module.exports = {signUp, login, updateProfile, checkAuth};