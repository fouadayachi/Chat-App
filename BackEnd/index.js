import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/DB.js";
import { app, server } from "./config/socket.js";
import authRouter from "./routers/auth.route.js";
import messageRouter from "./routers/message.route.js";
import path from 'path'

dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))
const PORT = process.env.PORT || 5002;
connectDB();
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../FrontEnd","dist","index.html"));
  })
}
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

