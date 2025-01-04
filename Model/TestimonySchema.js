
const mongoose = require('mongoose')



const TestimonySchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
   
})



const testimony = mongoose.model("testimony",TestimonySchema)
module.exports = testimony