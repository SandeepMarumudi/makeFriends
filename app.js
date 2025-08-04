const {adminAuth}=require("./src/middlewares/admin")
const express=require("express")
const app=express()


app.get("/getUserdata",(req,res)=>{
    throw new Error("hiiiiiii")
    res.send("userData sent")
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("somthing went wrong")
    }
})




app.listen(7777,()=>{
    console.log("server started running in 7777")
})
