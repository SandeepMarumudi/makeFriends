const express=require("express")
const{userAuth}=require("../middlewares/userAuth")
const { validateUserProfileForUpdate } = require("../utils/validations")
const User = require("../models/users")
const crypto=require("crypto")
const bcrypt=require("bcrypt")





const profileRouter=express.Router()

profileRouter.get("/profile",userAuth,async(req,res)=>{
 
  try{
    const user=req.user
      
    res.send(user)

  }catch(err){
    res.status(400).send("please login ")
  }
})

profileRouter.post("/profile/edit",userAuth,async(req,res)=>{
  try{
    const isAllowed=validateUserProfileForUpdate(req.body)
if(!isAllowed){
 throw new Error("invalid edit request")
}
 const logginedUser=req.user
 console.log("logined user:",logginedUser)
  Object.keys(req.body).forEach((each)=>logginedUser[each]=req.body[each])
  await logginedUser.save()
res.json(`{${logginedUser.firstName}} data is succesfully updated `)
  }catch(err){
    res.status(400).send(err.message)
  }
})

profileRouter.post("/forgetPassword",async(req,res)=>{

  try{
    const {email}=req.body
    const user=await User.findOne({email:email})
    if(!user){
      throw new Error("User not found Please signUp")
    }
    
    //generate a random token we used crypto
    const resetToken=crypto.randomBytes(32).toString("hex")

  //hash the values
  const hashToken=crypto.createHash("sha256").update(resetToken).digest("hex")
  user.resetToken=hashToken
  user.expireToken=Date.now()+10*60*1000
  await user.save()
  res.json({message:"password token is generated",
            resetToken:resetToken 
  })

  }catch(err){
    res.status(400).send(err.message)
  }
})

profileRouter.post("/resetPassword/:token",userAuth,async(req,res)=>{
  try{
  const resetToken=crypto.createHash("sha256").update(req.params.token).digest('hex') 
  const user=await User.findOne({resetToken:resetToken})
  if(!user){
    throw new Error("Your token is Expired please click resend token")
  }
  const newHashPassword=await bcrypt.hash(req.body.password,10)
  user.password=newHashPassword
  await user.save()
  res.send(`${user.firstName} your password is successfully updated`)

  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports=profileRouter