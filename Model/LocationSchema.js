const mongoose = require('mongoose')



const LocationSchema = mongoose.Schema({
    districtname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
   
})



const location = mongoose.model("location",LocationSchema)
module.exports = location