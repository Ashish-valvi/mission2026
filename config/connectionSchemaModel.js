const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const connectionSchema = new Schema({
    fromUser : {
        type:mongoose.Schema.Types.ObjectId
    },
    toUser : {
        type :mongoose.Schema.Types.ObjectId
    },
    fromUserName : {
       type : String
    },
    toUserName: {
        type: String
    },
    status :{
        type : String,
        enum:{
            values : ["intrested","ignored","accepted","rejected"],
            message: "invalid input"
        }
    }
},{
    timestamps:true
})

const ConnectionModel = model("connectionReq",connectionSchema)

module.exports = ConnectionModel;