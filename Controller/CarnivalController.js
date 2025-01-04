const carnival = require('../Model/CarnivalSchema')

exports.CarnivalReg = async(req,res)=>{
console.log("inside carnival");

    const {carnivalname,districtname,locationname,startdate,enddate,description,time,amount}= req.body
    const carnivalImage=req.file.filename
    console.log(carnivalImage);
    try{
        const existingCarnival = await carnival.findOne({carnivalname,districtname,locationname,startdate,enddate,carnivalImage,description,time,amount})

    if(existingCarnival){
        res.status(406).json("Carnival already Registered")
    }else{
        const newCarnival = new carnival({
            carnivalname,districtname,locationname,startdate,enddate,description,carnivalImage,time,amount
        })
        await newCarnival.save()
        res.status(200).json(newCarnival)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        
    }

    //get
    exports.getcarnival=async(req,res)=>{
        try{
            const getCarnival = await carnival.find()
            res.status(200).json(getCarnival)
        }catch(err)
        {
            res.status(401).json(err)
        }
    }
    //
    
    exports.CarnivalData = async (req, res) => {
        const { location } = req.params;
    
        try {
            const carnivalData = await carnival.find({locationname:location }); // Sort alphabetically
            if (carnivalData.length === 0) {
                return res.status(404).json({ message: "No locations found for this district" });
            }
            res.status(200).json(carnivalData);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while fetching locations" });
        }
    };

    exports.getCarnivalById = async (req, res) => {
        const { carnivalid } = req.params;
      
        try {
          const carnivalData = await carnival.findOne({ _id: carnivalid });
          if (!carnivalData) {
            return res.status(404).json({ message: "No carnival found" });
          }
          res.status(200).json([carnivalData]); // Wrap it in an array for consistency
        } catch (error) {
          res.status(500).json({ error: "An error occurred while fetching request" });
        }
      };
      

    exports.getCarnivalDetails = async (req, res) => {
        const { id } = req.params;
      
        try {
          const carnivalDetails = await carnival.findOne({ _id: id });
          if (!carnivalDetails) {
            return res.status(404).json({ message: "No carnival found" });
          }
          res.status(200).json([carnivalDetails]); // Wrap it in an array for consistency
        } catch (error) {
          res.status(500).json({ error: "An error occurred while fetching request" });
        }
      };
      //delete

exports.deleteCarnival = async(req,res)=>{
  const {carnivalId} = req.params

  try{
      const deleteData = await carnival.findByIdAndDelete(carnivalId)
      res.status(200).json(deleteData)
  }catch(err){
      res.status(401).json(err)
  }
}
