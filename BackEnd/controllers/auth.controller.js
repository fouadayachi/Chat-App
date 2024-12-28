import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import generateToken from "../config/utils.js";
import User from "../models/user.model.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "Email address already in use" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
    } else return res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
};
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
const update = async (req, res) => {
    try {
        const {profile_pic} = req.body;
        const userId = req.user._id;
        if(!profile_pic)
            return res.status(400).json({message: "Profile picture is required"});
        const uploadResponse = await cloudinary.uploader.upload(profile_pic); 
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});  
        res.status(200).json({updatedUser});
    } catch (error) {
        res.status(500).json({message: "Server error",error});
    }
};
const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({message: "Server error ops",error});
    }
};

export { checkAuth, login, logout, signup, update };

