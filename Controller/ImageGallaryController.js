const imagegallary = require('../Model/ImageGallarySchema');

exports.ImageGallaryReg = async (req, res) => {
  const { title, description,userId } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const existingImageGallary = await imagegallary.findOne({ title, description });

    if (existingImageGallary) {
      return res.status(406).json({ error: 'Image gallery with this title and description already exists' });
    }
    const newImageGallary = new imagegallary({
      title,
      description,
      userId,
      image,
     
    });
    await newImageGallary.save();
    res.status(200).json(newImageGallary);
  } catch (err) {
    console.error('Error registering image:', err);
    res.status(500).json({ error: 'Server error while registering image' });
  }
};


exports.getImageGallaryById = async (req, res) => {
    const { userId } = req.params;
  
    try {
        const requests = await imagegallary.find({ userId: userId }); // Sort alphabetically
        if (requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching request" });
    }
  };
  

  exports.deleteImageGallary = async(req,res)=>{
    const {imagegallaryId} = req.params
  
    try{
        const deleteData = await imagegallary.findByIdAndDelete(imagegallaryId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
  }
    
    