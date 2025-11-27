const userModel = require("../models/UserModel.js");
const bcryptjs = require("bcryptjs");
const generateToken = require("../lib/utils.js");

//Sign up 
const signUp = async (req, res) => {

    const{fullname, email, password, bio} = {fullname:"chat",email:"chat@gmail.com", password:"chat",bio:"hello"};

    try
    {
        if(!fullname || !email || !password || OrderedBulkOperation)
        {
            res.status(401).json({success:false, message:"missing details"});
            return;
        }

        const user = userModel.findOne({email});

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

module.exports = {signUp, login};