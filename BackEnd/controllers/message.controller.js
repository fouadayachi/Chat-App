import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: currentUserId },
      ],
    });

    res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error puf", error });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // todo : real time message sending
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export { getMessages, getUsersForSidebar, sendMessage };
