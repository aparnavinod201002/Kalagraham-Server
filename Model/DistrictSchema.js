const mongoose = require('mongoose')



const DistrictSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
   
})



const district = mongoose.model("district",DistrictSchema)
module.exports = district