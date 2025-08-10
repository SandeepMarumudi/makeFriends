const {adminAuth}=require("./src/middlewares/admin")
const connectDB=require("./src/config/dataBase")
const express=require("express")
const User = require("./src/models/users")
const app=express()
app.use(express.json())


// app.post("/signup",async(req,res)=>{
//     console.log(req.body)
//     const user=new User(req.body)
//     try{
//         await user.save()
//         res.send("data successfully inserted")
//     }catch(err){
//         res.status(400).send("something went wrong data not inserted")
//     }
// })
app.get("/user",async(req,res)=>{
    const userName=req.body.firstName
    try{
        const users= await User.find({firstName:userName})
        if(users.length===0){
            res.send("no data found")
        }else{
          res.send(users)
        }
    }catch(err){
        console.log(err)
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const allUsers=await User.find({})
        if(allUsers.length===0){
            res.send("no data fount")
        }else{
            res.send(allUsers)
        }
    }catch(err){
    console.log(err)
    }
})

connectDB()
.then(()=>{
    console.log("database connected successfully")
    app.listen(7777,()=>{
    console.log("server started running in 7777")
})
})
.catch((err)=>{
console.log(err)
})





