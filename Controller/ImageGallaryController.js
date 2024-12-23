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

  exports.editImage = async (req, res) => {
    const { title, description, _id } = req.body; // Use req.body to get data
    const uploadImage = req.file ? req.file.filename : null;
  
    if (!_id) {
      return res.status(400).json({ error: 'Image gallery ID (_id) is required' });
    }
  
    try {
      // Find the existing image gallery to retain previous image if no new upload
      const existingImageGallary = await imagegallary.findById(_id);
  
      if (!existingImageGallary) {
        return res.status(404).json({ error: 'Image gallery not found' });
      }
  
      // Build update object dynamically
      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      updateData.image = uploadImage || existingImageGallary.image;
  
      const updatedImageGallary = await imagegallary.findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true } // Return the updated document
      );
  
      res.status(200).json(updatedImageGallary);
    } catch (err) {
      console.error('Error updating image gallery:', err);
      res.status(500).json({ error: 'Server error while updating image gallery' });
    }
  };
  