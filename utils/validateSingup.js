const { Error } = require('mongoose');
const validator = require('validator');

const validateSingup=(req)=>{
    const {firstName,lastName,email,mobileNumber,password } = req.body

    if(firstName.legth < 3 || firstName.legth>50 || lastName.length <3 || lastName.legth > 50){
        throw new Error("name and last name should between 3 to 50 character")
    }else if(!validator.isEmail(email)){
        throw new Error("Enter valid email address")
    }else if(!validator.isMobilePhone(mobileNumber)){
        throw new Error("Enter valid mobile number")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password. 8 character+spetial character + number + Capital character")
    }
}

module.exports = validateSingup;