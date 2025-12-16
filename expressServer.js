//express server 
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8888;
const UserModel = require("./config/model")
const validateSingup = require("./utils/validateSingup")
const bcrypt = require("bcryptjs")


app.use(express.json())


app.post("/signup",async (req,res)=>{

    // console.log(req.body)
    
    try {
        const {  firstName,lastName,email,mobileNumber,password  } = req.body
        // cheking user data 
        validateSingup(req);
        // password hashing 
        const hashedPass = await bcrypt.hash(password,10)
        console.log(hashedPass);
        const newUser = new UserModel({firstName,lastName,email,mobileNumber,password:hashedPass})
        console.log(newUser)
        let result = await newUser.save()
        console.log(result._id);
        res.send("user created succesfully")
    } catch (err) {
       if(err.code === 11000){
         res.status(401).send("user already exist")
       }else{
          console.log(err.message);
        
        res.status(401).send("something went wrong "+err.message)
       }
    }
    
})

app.patch("/update", async (req,res)=>{
    // console.log(req.body.email)
    // res.send(req.body.email)
    const update = req.body
    try {
        const result = await UserModel.updateOne({email:req.body.email},{password:update.password})
        console.log(result)
        if(result.matchedCount === 1){
           res.send("user updated")
        }else{
            res.send("user not found")
        }
        
    } catch (error) {
        console.log(error)
        res.send("something went wrong")
    }
})

app.get("/feed",async (req,res)=>{

    try {
       const feed = await UserModel.find({})
       res.send(feed)
    } catch (err) {
        console.log(err)
        res.send("something went wrong")
    }
    
})



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

