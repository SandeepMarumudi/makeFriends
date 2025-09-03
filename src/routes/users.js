const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/users");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectionsReceived = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age gender photoUrl");
    res.json({
      message: "data fetch successfully:",
      data: connectionsReceived,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedUser._id, status: "accepted" },
        { toUserId: loggedUser._id, status: "accepted" },
      ]
    })
      .populate("fromUserId", "firstName lastName gender age skills photoUrl")
      .populate("toUserId", "firstName lastName gender age skills photoUrl");

    if (!connectionRequests) {
      throw new Error("no data found");
    }

    res.json({ data: connectionRequests });
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const limit=parseInt(req.query.limit) || 10
    const page=parseInt(req.query.page) || 1
    const skip=(page-1)*limit

    const requestsReceivedOrSent = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId age");

    const hideUsersFromFeed = new Set();
    requestsReceivedOrSent.map((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
  
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedUser._id } },
      ],
    }).select("firstName lastName age photoUrl about")
    .skip(skip)
    .limit(limit)

    res.send(users);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = userRouter;
