// const { adminAuth } = require("./src/middlewares/admin");
const cookie=require("cookie-parser")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {validateUser} = require("./src/utils/validations");
const connectDB = require("./src/config/dataBase");
const express = require("express");
const User = require("./src/models/users");
const { userAuth } = require("./src/middlewares/userAuth");
const app = express();
app.use(cookie())
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, age, password, gender } =
      req.body;

    //check the user for valide information
    validateUser(req.body);

    //EnCrypt the password
    const beCryptPassword = await bcrypt.hash(password, 10);
  

    // after validations and becryption of password insert data to the database

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: beCryptPassword,
      gender,
      age,
    });

    await user.save();
   

    res.send("data successfully inserted to the database");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/login",async(req,res)=>{
  const {email,password}=req.body
  try{
    const user= await User.findOne({email:email})
    console.log(user)
    if(!user){
      throw new Error("Email id not found please SignUp")
    }

    const checkPassword= await bcrypt.compare(password,user.password)
    if(checkPassword){
      const token= await jwt.sign({_id:user._id},"Sandy2242@")
      console.log("token is:",token)
      res.cookie("token",token)
      res.send("user successfully loggedin")
    }else{
      throw new Error("Password wrong please re enter")
    }

  }catch(err){
    res.status(400).json({ message: err.message })
  }
})

app.get("/profile",userAuth,async(req,res)=>{
 
  try{
    const user=req.user
      
    res.send(user)

  }catch(err){
    res.status(400).send("please login ")
  }
})

app.get("/user", async (req, res) => {
  const userName = req.body.firstName;
  try {
    const users = await User.find({ firstName: userName });
    if (users.length === 0) {
      res.send("no data found");
    } else {
      res.send(users);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      res.send("no data fount");
    } else {
      res.send(allUsers);
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    //you can also write findByIdAndDelete({_id:userId})  above is short hand
    res.send("user successfully deleted");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  //   const userId = req.body.userId;
  const { userId, ...remaingData } = req.body;
  const data = req.body;
  try {
    const allowUpdates = ["gender", "phone"];
    const isAllowed = Object.keys(remaingData).every((every) =>
      allowUpdates.includes(every)
    );
    if (isAllowed) {
      throw new Error("Updates not allowed");
    }
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

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
