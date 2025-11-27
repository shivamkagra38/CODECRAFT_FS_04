const express = require("express");
const dotenv = require("dotenv");
const http = require('http');
const cors = require("cors");
const connectDB = require("./lib/db.js");

dotenv.config({});
connectDB();


const app = express();
const server = http.createServer(app);

//Middlewares
app.use(express.json({limit: "4mb"}));
app.use(cors());

app.use("/api/status", (req,res)=> {

    res.send("Server is live");

});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});