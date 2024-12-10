const location = require('../Model/LocationSchema')


exports.LocationReg = async(req,res)=>{

    const {districtname,name}= req.body
    try{
        const existingLocation = await location.findOne({districtname,name})

    if(existingLocation){
        res.status(406).json("Location already Registered")
    }else{
        const newLocation = new location({
            districtname,name
        })
        await newLocation.save()
        res.status(200).json(newLocation)
    }
    
    
        }
        catch(err){
            res.status(401).json(err)
        }
    
        
    }

    //get
    exports.getlocations=async(req,res)=>{
        try{
            const getLocations = await location.find()
            res.status(200).json(getLocations)



        }catch(err)
        {
            res.status(401).json(err)
        }
    }
    

      
    //
    exports.getLocationsByDistrict = async (req, res) => {
        const { district } = req.params;
    
        try {
            const locations = await location.find({ districtname: district }); // Sort alphabetically
            if (locations.length === 0) {
                return res.status(404).json({ message: "No locations found for this district" });
            }
            res.status(200).json(locations);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while fetching locations" });
        }
    };
    

  exports.deleteLocation = async(req,res)=>{
    const {locationId} = req.params
  
    try{
        const deleteData = await location.findByIdAndDelete(locationId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
  }