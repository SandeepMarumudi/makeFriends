const mongoose=require("mongoose")

const connectDB=async ()=>{
await mongoose.connect("mongodb+srv://sandy2242:2KOLKM9CvRfjxkZD@namstenode.vefwfiq.mongodb.net/devTinder")
}


module.exports= connectDB
