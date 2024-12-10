const district = require('../Model/DistrictSchema')


exports.DistrictReg = async(req,res)=>{

    const {name}= req.body
    try{
        const existingDistrict = await district.findOne({name})

    if(existingDistrict){
        res.status(406).json("District already Registered")
    }else{
        const newDistrict = new district({
            name
        })
        await newDistrict.save()
        res.status(200).json(newDistrict)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        
    }

    //get
    exports.getdistricts=async(req,res)=>{
        try{
            const getDistricts = await district.find()
            res.status(200).json(getDistricts)



        }catch(err)
        {
            res.status(401).json(err)
        }
    }
    
    
exports.deleteDistrict = async(req,res)=>{
    const {districtId} = req.params
  
    try{
        const deleteData = await district.findByIdAndDelete(districtId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
  }
    
    
    