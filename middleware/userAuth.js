// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const port = 8888;
const UserModel = require("../config/model")
// const validateSingup = require("./utils/validateSingup")
// const cookieParser = require('cookie-parser')
// const bcrypt = require("bcryptjs");
jwt = require('jsonwebtoken');


const  userAuth= async (req,res,next)=>{
    try {
      if(!req.cookies){
        res.send("login first")
      }else{
        const cookiesC = req.cookies
        const decoded = jwt.verify(cookiesC.tocken, "@Ashish");
        console.log(decoded.id)
        const matchID = await UserModel.findById(decoded.id)
        if(matchID === "invalid token"){
            res.send("invalid tocken , please login again")
        }else{
            req.user = matchID
            next()
        }
      }
   } catch (err) {
      console.log(err.message)
      res.send("error "+err.message)
   }
}

module.exports= {userAuth}