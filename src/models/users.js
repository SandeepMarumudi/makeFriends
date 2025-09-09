const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: false, 
      unique: false,
    },
    phone: {
      type: Number,
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      unique: true,
    },
    about: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    expireToken: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  try {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Sandy2242@");
    return token;
  } catch (err) {
    console.log(err.message);
  }
};

userSchema.methods.validatePassword = async function (userInputPassword) {
  try {
    const user = this;
    const hashPassword = user.password;

    const ispassword = await bcrypt.compareSync(
      userInputPassword,
      hashPassword
    );
    return ispassword;
  } catch (err) {
    res.status(400).send(err.message);
  }
};


const User = mongoose.model("User", userSchema); // creating a model with userScema
module.exports = User; // export the mode
