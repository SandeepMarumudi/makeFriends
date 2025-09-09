// const { adminAuth } = require("./src/middlewares/admin");
const cookie=require("cookie-parser")
const connectDB = require("./src/config/dataBase");
const express = require("express");
const cors=require("cors")
const User = require("./src/models/users");
const authRouter= require("./src/routes/auth")
const profileRouter=require("./src/routes/profile");
const requestRouter = require("./src/routes/requests");
const userRouter = require("./src/routes/users");


const app = express();
app.use(cookie())
app.use(express.json());
app.use(cors({
  origin: "https://vercel.com/sandeeps-projects-1feb6a5c/make-friends-frontend/C9caE36MiW5WeiUYZWusEmEfrmvV",
  credentials:true
})) //cors error while fetching api's from the frontEnd

 
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

// app.get("/user", async (req, res) => {
//   const userName = req.body.firstName;
//   try {
//     const users = await User.find({ firstName: userName });
//     if (users.length === 0) {
//       res.send("no data found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const allUsers = await User.find({});
//     if (allUsers.length === 0) {
//       res.send("no data fount");
//     } else {
//       res.send(allUsers);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     //you can also write findByIdAndDelete({_id:userId})  above is short hand
//     res.send("user successfully deleted");
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

// app.patch("/user", async (req, res) => {
//   //   const userId = req.body.userId;
//   const { userId, ...remaingData } = req.body;
//   const data = req.body;
//   try {
//     const allowUpdates = ["gender", "phone"];
//     const isAllowed = Object.keys(remaingData).every((every) =>
//       allowUpdates.includes(every)
//     );
//     if (isAllowed) {
//       throw new Error("Updates not allowed");
//     }
//     const users = await User.findByIdAndUpdate({ _id: userId }, data, {
//       runValidators: true,
//     });
//     res.send("user updated successfully");
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("server started running in 7777");
    });
  })
  .catch((err) => {
    console.log(err);
  });
