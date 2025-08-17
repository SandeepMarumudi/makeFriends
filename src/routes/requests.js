const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const User = require("../models/users");
const ConnectionRequest = require("../models/connectionRequests");

const requestRouter = express.Router();

//sending request to the user
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const fromUserId = req.user._id;
      const allowedStatus = ["interested", "ignored"];

      //check the below before savinn data to the database

      //check the status before saving data,you can't send reject and accepted
      if (!allowedStatus.includes(status)) {
        return res.status(404).json({ message: `${status} is not allowed` });
      }

      //check whether the userId your sending is there in the dataBase or not
      const isUserPresent = await User.findById({ _id: toUserId });
      if (!isUserPresent) {
        return res
          .status(404)
          .json({ message: `${toUserId} is not present in the dataBase` });
      }

      //check if the requests are already sent by the user to another if there return already sent request
      //FIRST CASE
      // {fromUserId:fromUSerId,toUSerId:toUserID}  Checking a sent to b
      // {fromUserId:toUserId,toUserId:fromUserId}  checking b sent to a

      const isExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //{fromUserId:fromUSerId,toUSerId:toUserID}
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (isExist) {
        return res
          .status(404)
          .json({ message: `you already sent request to ${toUserId}` });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " " + status + " in " + fromUserId,
        data,
      });
    } catch (err) {
      res.send(err.message);
    }
  }
);

//accept or reject the request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      const loggedUser = req.user._id; //comes from userAuth
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.json({ message: `${status} not allowed` });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedUser,
        status: "interested",
      });
      
      const sender = await ConnectionRequest.findById({ _id:requestId});
      const {fromUserId}=sender
      const requestSender=await User.findById({_id:fromUserId})

      if (!connectionRequest) {
        return res.json({ message: "user not found" });
      }

      connectionRequest.status = "accepted";
      const data = await connectionRequest.save();
      res.json({
        message: `successfully accepted ${requestSender.firstName} request`,
      });

    } catch (err) {
      res.status(404).send(err.message);
    }
  }
);

module.exports = requestRouter;
