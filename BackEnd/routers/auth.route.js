import express from "express";
import { login, logout, signup, update,checkAuth } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup" ,signup);
authRouter.post("/login" ,login);
authRouter.post("/logout" ,logout);
authRouter.put("/update-profile" ,protectRoute,update);
authRouter.get("/check" ,protectRoute,checkAuth);


export default authRouter;