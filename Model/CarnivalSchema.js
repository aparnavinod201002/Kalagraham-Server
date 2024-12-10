const mongoose = require('mongoose')



const CarnivalSchema = mongoose.Schema({
    carnivalname:{
        type:String,
        required:true
    },
    districtname:{
        type:String,
        required:true
    },
    locationname:{
        type:String,
        required:true
    }, startdate:{
        type:Date,
        required:true
    }
    ,
    enddate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    carnivalImage:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

   
})



const carnival = mongoose.model("carnival",CarnivalSchema)
module.exports = carnival