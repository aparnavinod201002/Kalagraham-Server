const videogallary = require('../Model/VideoGallarySchema');

exports.VideoGallaryReg = async (req, res) => {
  const { title, description,userId,url } = req.body;
  const coverimage = req.file ? req.file.filename : null;

  if (!coverimage) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const existingVideoGallary = await videogallary.findOne({ title, description,url });

    if (existingVideoGallary) {
      return res.status(406).json({ error: 'Image gallery with this title and description already exists' });
    }
    const newVideoGallary = new videogallary({
      title,
      description,
      userId,
      coverimage,
      url
     
    });
    await newVideoGallary.save();
    res.status(200).json(newVideoGallary);
  } catch (err) {
    console.error('Error registering image:', err);
    res.status(500).json({ error: 'Server error while registering image' });
  }
};


exports.getVideoGallaryById = async (req, res) => {
    const { userId } = req.params;
  
    try {
        const requests = await videogallary.find({ userId: userId }); // Sort alphabetically
        if (requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching request" });
    }
  };
  
  
  exports.deleteVideoGallary = async(req,res)=>{
    const {videogallaryId} = req.params
  
    try{
        const deleteData = await videogallary.findByIdAndDelete(videogallaryId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
  }
    
    
