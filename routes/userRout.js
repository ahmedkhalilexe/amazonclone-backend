const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const bcrypt =require("bcrypt");
router.post("/signup", async (req, res) => {
  const { displayName, email, password } = req.body;
  const findIfUserExists = await userModel.findOne({ email })
  if(findIfUserExists)return res.status(400).json({message : "user already exists"});
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new userModel({ displayName, email, password : hashedPassword });
  try {
    const createdUser = await user.save();
    res.status(200).send("user signed up");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/signin", async(req , res)=>{
  const { email , password } = req.body;
  const findIfUserExists = await userModel.findOne({ email });
  if(findIfUserExists){
    const passwordMatch = await bcrypt.compare(password, findIfUserExists.password);
    if(passwordMatch){
      return res.status(200).json({message : "user signed in"});  
    }
    return res.status(400).json({message : "password incorrect"}); 
  }
  return res.status(404).send({message : "user doesn't exist"}); 

})
module.exports = router;