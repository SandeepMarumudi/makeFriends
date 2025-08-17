const { type, status } = require("express/lib/response");
const { default: mongoose } = require("mongoose");


const connectionRequestsSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{value} is not a status type`

        }
    }
},
{timestamps:true}
)
connectionRequestsSchema.pre("save",function(next){
    console.log("schema method called")
    const connectionRequest=this
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you cannot send request to yourself")
    }
    next()
})

const ConnectionRequest =mongoose.model("ConnectionRequest",connectionRequestsSchema)
module.exports=ConnectionRequest