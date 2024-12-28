import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) 
            return res.status(401).json({message: "Unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded)
            return res.status(401).json({message: "Unauthorized ,token is not valid"});
        const user = await User.findById(decoded.userId).select("-password");
        if(!user)
            return res.status(404).json({message: "user not found"});
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message: "Server error o", error});
    }
}

export default protectRoute;