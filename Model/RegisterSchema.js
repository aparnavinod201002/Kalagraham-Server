const mongoose = require('mongoose')



const RegisterSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
   
})



const users = mongoose.model("register",RegisterSchema)
module.exports = users