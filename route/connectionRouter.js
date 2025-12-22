const express = require("express")
const connectionRouter = express.Router()
const {userAuth} = require("../middleware/userAuth")
const UserModel = require("../config/model")
const ConnectionModel = require("../config/connectionSchemaModel")
const { Error, default: mongoose } = require("mongoose")


connectionRouter.post("/sendConnectionRequest/:touser/:status", userAuth ,async (req,res)=>{

   try {
      const fromUser = req.user._id 
      const toUser = req.params.touser 
      const status = req.params.status
      const fromUserName = req.user.firstName;
      let toUserName;
   // self request check  - ✅
   if(fromUser.equals(toUser)){
      throw new Error("you cant send request to yourself")
   }

   // status check - ✅
   const allowedStatus = ["intrested","ignored"]
   if(!allowedStatus.includes(status)){
      throw new Error("invalid status "+status)
   }

   // valid id check - ✅
    if(!mongoose.Types.ObjectId.isValid(toUser)){
      throw new Error("invalid request - send request to valid user")
    }

   // check toUser user exist in db or not - ✅
   const findResult = await UserModel.findById(toUser)
   if(findResult){
       console.log(findResult)
       toUserName = findResult.firstName
       console.log(toUserName);
   }else{
      throw  new Error("match not found : wrong user")
   }
   
   // check already request have sent - check in connection model ✅
   const beforeReq = await ConnectionModel.findOne({toUser:toUser,fromUser:fromUser})
   if(beforeReq){
      console.log(beforeReq)
      throw new Error("connection request have already sent")
   }
   // check for previous request from alternate person(toperson) ✅ accept pending
   const reqFromToUser = await ConnectionModel.findOne({fromUser:toUser, toUser:fromUser ,  status:"intrested"}) 
   if(reqFromToUser){

      // here put logic to patch and update the doccument and change status to accepted

      console.log("Congratulation Its a match");
   }

   //saving to db ✅
    const result = new ConnectionModel({fromUser,toUser,fromUserName:fromUserName,toUserName:toUserName,status})
    let saveResult = await result.save()

   
   
   res.send("connection request send succesfully")
   } catch (err) {
      res.status(400).send(err.message)
   }
})

connectionRouter.post("/reviewsconnectionrequest/:input" ,userAuth, async (req,res)=>{
   //check login user 
   // touser must be loggedin user 
   //find = touser + status should be intrested
   //send status only acepetd or rejected


   const reqNum = await ConnectionModel.find({toUser:req.user._id})
   console.log(reqNum.length)
   res.send("under construction")
})

module.exports = connectionRouter;