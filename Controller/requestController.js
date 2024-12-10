const request = require("../Model/RequestRegSchema");

exports.requestReg = async (req, res) => {
  const {
    userId,
    carnivalName,
    locationName,
      districtName,
      requests,
    startDate,
    endDate,
    categoryName,
    subCategoryName,
    aboutMe,
    description,
    username
  } = req.body;
  try{
 
    const existingRequest = await request.findOne({
     
      userId,
      carnivalName,
      categoryName,
      subCategoryName
  })
     
    if (existingRequest) {
      return res.status(406).json("Already Requested");
    }
else{
    // Save new request
    const newRequest = new request({
      userId,
      carnivalName,
      locationName,
      districtName,
      requests,
      startDate,
      endDate,
      categoryName,
      subCategoryName,
      aboutMe,
      description,
      username
    });
  
    await newRequest.save();
    return res.status(200).json(newRequest);
  }
  } catch (err) {
    console.error("Error saving request:", err);
    return res.status(500).json("Internal Server Error");
  }
};



 //
 exports.getRequestById = async (req, res) => {
  const { userId } = req.params;

  try {
      const requests = await request.find({ userId: userId }); // Sort alphabetically
      if (requests.length === 0) {
          return res.status(404).json({ message: "No requests found" });
      }
      res.status(200).json(requests);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching request" });
  }
};
exports.postReply = async (req, res) => {
  const { userId, reply, date } = req.body;

  try {
    // Validate request payload
    if (!userId || !reply || !date) {
      return res.status(400).json({ message: "Missing required fields: userId, reply, or date." });
    }

    // Update the `requests` and `date` fields for the matching userId
    const updatedRequest = await request.findOneAndUpdate(
      { userId }, // Filter condition
      { $set: { requests: reply, date: date } }, // Fields to update
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found for the provided userId." });
    }

    return res.status(200).json({
      message: "Reply and date updated successfully.",
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating reply:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteRequest = async(req,res)=>{
  const {requestId} = req.params

  try{
      const deleteData = await request.findByIdAndDelete(requestId)
      res.status(200).json(deleteData)
  }catch(err){
      res.status(401).json(err)
  }
}
  
  
