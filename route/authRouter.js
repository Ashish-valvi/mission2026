const express = require("express")
const authRouter = express.Router()
const bcrypt = require("bcryptjs");
const validateSingup = require("../utils/validateSingup")
const UserModel = require("../config/model")


authRouter.post("/login",async (req,res)=>{
    try {
        const {email , password} = req.body

        const result = await UserModel.findOne({email:email})

        const passCheck = await bcrypt.compare(password,result.password);

        
        if(passCheck === true){
            
          const tocken = await  jwt.sign({ "id" : result._id },"@Ashish", { expiresIn: '7d' })
           //    console.log(tocken)
            res.cookie("tocken",tocken)

            res.send("login successfull "+ result.firstName)
        }else{
            res.status(401).send("invalid credentials")
        }

    } catch (err) {
         res.status(401).send("something went wrong "+err.message)
    }
})

authRouter.post("/signup",async (req,res)=>{

    // console.log(req.body)
    
    try {
        const {  firstName,lastName,email,mobileNumber,password  } = req.body
        // cheking user data 
        validateSingup(req);
        // password hashing 
        const hashedPass = await bcrypt.hash(password,10)
        // console.log(hashedPass);
        const newUser = new UserModel({firstName,lastName,email,mobileNumber,password:hashedPass})
        // console.log(newUser)
        let result = await newUser.save()
        // console.log(result._id);
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

authRouter.post("/logout",(req,res)=>{
    res.clearCookie("tocken",null)
    res.send("logout successfull")
})


module.exports = authRouter