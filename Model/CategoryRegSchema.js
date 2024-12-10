const mongoose = require('mongoose')



const CategoryRegSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
   
})



const category = mongoose.model("categories",CategoryRegSchema)
module.exports = category