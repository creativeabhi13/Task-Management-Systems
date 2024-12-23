import User from "../models/User.js";
import customResponse from "../utilities/response.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_TOKEN = process.env.JWT_SECRET;

export const isAuthenticated = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
      const decoded = jwt.verify(token, JWT_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");
      next();
  } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Token is not valid" });
  }
  };


