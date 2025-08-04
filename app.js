const {adminAuth}=require("./src/middlewares/admin")
const express=require("express")
const app=express()


app.use("/admin",adminAuth)

app.get("/admin/login",(req,res)=>{
res.send("admin is logined")
})




app.listen(7777,()=>{
    console.log("server started running in 7777")
})
