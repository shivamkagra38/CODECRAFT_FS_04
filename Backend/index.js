const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const cors = require("cors");
const connectDB = require("./lib/db.js");

const userControllers = require("./controllers/userController.js");
const isAuth = require("./customMiddlewares/isAuth.js");

dotenv.config({});
connectDB();


const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req,res)=> {

    res.send("Server is live");

});

app.post("/signup", userControllers.signUp);
app.post("/login", userControllers.login);
app.put("/update-profile", isAuth, userControllers.updateProfile);
app.get("/check", isAuth, userControllers.checkAuth);

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});