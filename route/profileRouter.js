const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/userAuth")
const validator = require('validator');

profileRouter.patch("/update", async (req,res)=>{
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

profileRouter.patch("/profile/edit",userAuth,(req,res)=>{

      try {
       const {firstName,lastName,mobileNumber,skills,about} = req.body
       let obj = {}
       if(firstName){
           if(firstName.length < 3 || firstName.length>50  ){
           throw new Error("name and last name should between 3 to 50 character") }
           else{
            obj.firstName += firstName
           }
       }

        if(lastName){
          if( lastName.length <3 || lastName.length > 50   ){
           throw new Error("name and last name should between 3 to 50 character")
        }else{
            obj.lastName = lastName
        }}
       
        if(mobileNumber){
          if(!validator.isMobilePhone(mobileNumber)){
           throw new Error("Enter valid mobile number")}else{
            obj.mobileNumber = mobileNumber
        }}
       
         if(skills){
          if( skills.length >15 ){
           throw new Error("skills should be less than 15")   }else{
            obj += skills
        }}

       if(about){
         if(about.length>400){
           throw new Error("please write about in 400 character")}else{
            obj += about
        }}
       
        console.log(obj);
        res.send("edit test pass")
    //   const {firstName,lastName,mobileNumber,skills,about} = req.body
    //   console.log(firstName.length)
    //   res.send("under process")
      } catch (err) {
        console.log(err)
        res.status(400).send("unauthorised request "+err.message)
      }

      
})


profileRouter.post("/profile", userAuth ,async (req,res)=>{
   res.send(req.user)
})




module.exports = profileRouter;