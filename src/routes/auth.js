const express=require("express")
const bcrypt=require("bcrypt")
const User=require("../models/users")
const {validateUser} = require("../utils/validations")




 

const authRouter=express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, age, password, gender,skills,photoUrl,about } =
      req.body;

    //check the user for valide information
    validateUser(req.body);

    //EnCrypt the password
    const beCryptPassword = await bcrypt.hash(password, 10);
  

    // after validations and becryption of password insert data to the database

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: beCryptPassword,
      gender,
      age,
      skills,
      photoUrl,
      about
    });

   const savedUser= await user.save();
  const token= await savedUser.getJWT()
    res.cookie("token",token)
   

    res.json({message:"User added successfull"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

authRouter.post("/login",async(req,res)=>{
  const {email,password}=req.body
  try{
    const user= await User.findOne({email:email})
    if(!user){
      throw new Error("Email id not found please SignUp")
    }

    const checkPassword= await user.validatePassword(password)
    if(checkPassword){
      const token= await user.getJWT()
      console.log("token is:",token)
      res.cookie("token",token)
      res.send(user)
    }else{
      throw new Error("Password wrong please re enter")
    }

  }catch(err){
    res.status(400).json({ message: err.message })
  }
})

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{expires:new Date(Date.now())})
  res.send("successfully logged out")
})

module.exports=authRouter 