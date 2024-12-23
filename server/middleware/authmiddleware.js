import User from "../models/User.js";
import customResponse from "../utilities/response.js";
import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET;

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN); // Use your actual secret key here
    req.userId = decoded.userId; // Assuming your token has a `userId` claim
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
  };


