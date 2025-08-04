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
module.exports={
    adminAuth,
}