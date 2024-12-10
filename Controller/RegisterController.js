
//single contemt export then use exports

const users = require('../Model/RegisterSchema')
const jwt = require('jsonwebtoken')

exports.users = async(req,res)=>{


    const{username,phoneno,email,password,role}=req.body
    try{
        const existingUser = await users.findOne({email})
if(existingUser){
    
    res.status(406).json("user already exists")
}else{
    const newUser = new users({
        username,phoneno,email,password,role
    })
    await newUser.save()
    res.status(200).json(newUser)
}


    }
    catch(err){
        res.status(401).json(err)
    }

    
}

exports.login = async(req,res)=>{

    const {email,password}= req.body
    try{
        const existingUser = await users.findOne({email,password})
if(existingUser){
    const token = jwt.sign({userId:existingUser._id},process.env.jwt_secret)
    res.status(200).json({existingUser,token})
    
}else{
    res.status(406).json("Invalid Email/Password")
}
    }
    catch(err){
        res.status(401).json(err)
    }

    
}
//user get
 //get
 exports.getUsers=async(req,res)=>{
    try{
        const getuser = await users.find({role:"user"})
        res.status(200).json(getuser)
    }catch(err)
    {
        res.status(401).json(err)
    }
}
//artst
exports.getArtists=async(req,res)=>{
    try{
        const getartist = await users.find({role:"artist"})
        res.status(200).json(getartist)
    }catch(err)
    {
        res.status(401).json(err)
    }
}
exports.getuser=async(req,res)=>{
    try{
        const { userId } = req.params;
        const Getuser = await users.find({_id:userId})
        res.status(200).json(Getuser)
    }catch(err)
    {
        res.status(401).json(err)
    }
}

exports.forgotpassword = async (req, res) => {
  const { email, newpassword, confirm } = req.body;

  try {
    // Check if the user exists
    const existingUser = await users.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate that newpassword matches confirm
    if (newpassword !== confirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Update the user's password
    existingUser.password = confirm;
    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully", user: existingUser });
  } catch (err) {
    console.error("Error in forgotpassword:", err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};




