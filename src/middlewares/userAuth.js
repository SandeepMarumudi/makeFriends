const jwt=require('jsonwebtoken')
const User = require('../models/users')

const adminAuth=(req,res,next)=>{
    const token='abc'
    const adminAuthorizsed= token==="abc"
    if(!adminAuthorizsed){
    
        res.status(401).send("unathorised admin login")
    }else{
      
        next()
    }
}
const userAuth=async(req,res,next)=>{
    try{
       
        const {token}=req.cookies
        if(!token){
            return res.status(401).send("Please Login!!!!!")
        }
        const decodedValue= await jwt.verify(token,"Sandy2242@")
        const {_id}=decodedValue
        const user=await User.findById({_id:_id})
        if(!user){
            throw new Error("user not found please login")
        }
        req.user=user
        console.log("fromUserAuth:",user)
        next()

    }catch(err){
    res.status(400).send(err.message)
    }
}
module.exports={
    adminAuth,
    userAuth
}