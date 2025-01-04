const testimony = require('../Model/TestimonySchema')


exports.TestimonyReg = async(req,res)=>{

    const { username,
        feedback}= req.body
    try{
        const existingDistrict = await testimony.findOne({username,feedback})

    if(existingDistrict){
        res.status(406).json("already Responded")
    }else{
        const newTestimony = new testimony({
            username,feedback
        })
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        

    }

    
    //get
    exports.TestimonyGet=async(req,res)=>{
        try{
            const getTestimony = await testimony.find()
            res.status(200).json(getTestimony)



        }catch(err)
        {
            res.status(401).json(err)
        }
    }

    
