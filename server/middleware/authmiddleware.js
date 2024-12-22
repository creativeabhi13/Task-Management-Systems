import User from "../models/User.js";
import customResponse from "../utilities/response.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
    try {
    
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return customResponse(res, 'Authentication failed: Token not provided', null, 401, false);
      }
  
      // Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // Ensure to use your secret here
  
      // Find the user based on decoded token
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return customResponse(res, 'Authentication failed: User not found', null, 401, false);
      }
  
      // Attach user to the request object for further use in controllers
      req.user = user;
      
      // Proceed to the next middleware
      next();
    } catch (error) {
      return customResponse(res, 'Authentication failed: Invalid token', null, 401, false);
    }
  };


