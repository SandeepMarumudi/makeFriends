const { type } = require("express/lib/response")
const mongoose=require("mongoose")
const validator=require("validator")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
       unique:true
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
     age:{
        type:Number
    },
    phone:{
        type:Number
    },
   
})
const User=mongoose.model("User",userSchema)
module.exports=User