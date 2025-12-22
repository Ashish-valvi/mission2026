//express server 
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8888;
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const authRouter = require("./route/authRouter")
const connectionRouter = require("./route/connectionRouter")
const profileRouter = require("./route/profileRouter")
const feedRouter = require("./route/feedRouter")

app.use(cookieParser())
app.use(express.json())

app.use("/",authRouter);
app.use("/",connectionRouter);
app.use("/",profileRouter);
app.use("/",feedRouter)



const  start = async ()=>{
   try {
        await mongoose.connect("mongodb+srv://ashishvalvinvp:O1z1gYSWysjEInwq@namasteashish.447hw.mongodb.net/devTinder?retryWrites=true&w=majority&appName=namasteAshish%22")
         console.log("mongodb connected")
         app.listen(port, () => {
         console.log(`Example app listening on port ${port}`)
         })
       } catch (err) {
           console.log(err)
       }

}

start()

