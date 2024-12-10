const mongoose = require('mongoose')



const SubCategorySchema = mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
   
})



const subcategory = mongoose.model("SubCategory",SubCategorySchema)
module.exports = subcategory