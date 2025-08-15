const express=require("express")
const{userAuth}=require("../middlewares/userAuth")
const { validateUserProfileForUpdate } = require("../utils/validations")





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

module.exports=profileRouter