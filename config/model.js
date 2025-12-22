const mongoose = require("mongoose");
const {Schema , model } = mongoose 

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        minlength:3,
        maxlength:20
    },
    lastName:{
        type:String,
        required: true,
        minlength:3,
        maxlength:20
    },
    about:{
        type:String,
        required: true,
        minlength:3,
        maxlength:300
    },
    email:{
        type:String,
        lowercase:true,
        required: true,
        minlength:3,
        maxlength:30,
        unique: true,
        validate: {
          validator: function(value){
           return value.includes("@");
          },
          message:" invalid email ID"}

    },
    mobileNumber:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    skills:[]
    
},{timestamps:true})

const UserModel = model('user',userSchema);



module.exports = UserModel;