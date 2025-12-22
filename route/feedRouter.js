const express = require("express")
const feedRouter = express.Router()
const {userAuth} = require("../middleware/userAuth")
const UserModel = require("../config/model")

feedRouter.get("/feed",userAuth ,async (req,res)=>{
    try {
       const feed = await UserModel.find({})
       res.json(feed)
    } catch (err) {
        console.log(err)
        res.send("something went wrong")
    }
})

module.exports = feedRouter;