const express=require("express")
const app=express()



app.use("/serverr",(req,res)=>{
res.send("server from the server")
})

app.listen(7777,()=>{
    console.log("server started running in 7777")
})
