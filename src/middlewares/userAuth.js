const jwt=require('jsonwebtoken')
const User = require('../models/users')

const adminAuth=(req,res,next)=>{
    const token='abc'
    const adminAuthorizsed= token==="abc"
    if(!adminAuthorizsed){
        console.log("unauthorised admin login")
        res.status(401).send("unathorised admin login")
    }else{
        console.log("admin logined")
        next()
    }
}
const userAuth=async(req,res,next)=>{
    try{
       
        const {token}=req.cookies
        if(!token){
            throw new Error("token not valid")
        }
        const decodedValue= await jwt.verify(token,"Sandy2242@")
        const {_id}=decodedValue
        const user=await User.findById({_id:_id})
        if(!user){
            throw new Error("user not found please login")
        }
        req.user=user
        next()

    }catch(err){
    res.status(400).send(err.message)
    }
}
module.exports={
    adminAuth,
    userAuth
}