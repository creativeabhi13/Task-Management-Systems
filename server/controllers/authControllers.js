import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import customResponse from "../utilities/response.js";
import sendMail from "../utilities/sendMail.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import generateToken from "../utilities/generateToken.js";
import sendMail1 from "../utilities/sendMail1.js";
import forgetpwd from "../utilities/forgotpwd.js";
import updatepwd from "../utilities/updatepwd.js";
dotenv.config();

const saltRounds = 13;
const JWT_TOKEN = process.env.JWT_SECRET;

// validate singup data

const validateSignupData = ({ username, email, phone, password }) => {
  if (!username || !email || !phone || !password) {
    return "All fields are required";
  }

  if (username.length < 3) {
    return "Name must be at least 3 characters";
  }

  if (username.length > 50) {
    return "Name must be at most 50 characters";
  }

  if (email.length < 5) {
    return "Email must be at least 5 characters";
  }

  if (email.length > 50) {
    return "Email must be at most 50 characters";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email is invalid";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.length > 16) {
    return "Password must be at most 16 characters";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character";
  }

  if (phone.length < 10) {
    return "Phone number must be at least 10 digits";
  }

  return null;
};

// signup controller
export const signup = async (req, res) => {
  const { username, email, phone, password } = req.body;

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  // Validate input
  const validationError = validateSignupData({ username, email: normalizedEmail, phone, password });
  if (validationError) {
    return customResponse(res, validationError, null, 400);
  }

  try {
    // Check for existing user with the same email or phone
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return customResponse(res, "User already exists with this email", null, 409);
      }
      if (existingUser.phone === phone) {
        return customResponse(res, "User already exists with this phone number", null, 409);
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the user
    let newUser = new User({
      username,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
    });

    // Generate and attach an email verification token
    const emailToken = uuidv4();
    newUser.emailToken = emailToken;
    newUser.email_sent_at = new Date();

    // Save the user to the database
    const savedUser = await newUser.save();
    if (!savedUser) {
      return customResponse(res, "User creation failed", null, 500);
    }

    // Send verification email
    sendMail({
      to: savedUser.email,
      subject: "Verify your email",
      store_name: "Creativeabhi13_Dashboard",
      name: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      link: `${process.env.website}/verifyEmail/${savedUser.emailToken}`,
    });

    return customResponse(
      res,
      "User created successfully! Please check your email to verify your account",
      null,
      201,
      true
    );
    
  } catch (err) {
    console.error("Signup error:", err.message);
    return customResponse(res, "An error occurred while creating the user", null, 500);
  }
};

// verify email token and update emailVerified field  & create actual token for user it is a get request

export const verifyEmail = async (req, res) => {
    // Extract token from route parameters
    const emailToken = req.params.token;
  
    if (!emailToken) {
      return customResponse(res, "Invalid token");
    }
  
    try {
      // Find the user by emailToken
      const user = await User.findOne({ emailToken: emailToken });
  
      if (!user) {
        return customResponse(res, "Invalid token");
      }
  
      // Generate a new token for the user
      let token = generateToken(user._id);
  
      // Update user fields
      user.emailToken = ""; // Clear the email token
      user.token = token;   // Set the new token
      user.emailVerified = true;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      if (updatedUser) {
         sendMail1({
            to: updatedUser.email,
            subject: "Email verified",
            store_name:"Cretiveabhi13_Dashboard",
            name: updatedUser.username,
            email: updatedUser.email,
            link: `${process.env.website}`,
         })

        return customResponse(
          res,
          "Email verified successfully",
          updatedUser,
          200,
          true
        );
      } else {
        return customResponse(res, "Email verification failed");
      }
    } catch (err) {
      return customResponse(res, err.message, null, 500, false);
    }
  };


  // login controller
  
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      
        return customResponse(res, "All fields are required");
    }
    if (email.length < 5) {
      return customResponse(res, "Email must be at least 5 characters");
    }
    
    if (email.length > 50) {
      return customResponse(res, "Email must be at most 50 characters");
    }
    
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return customResponse(res, "Email is invalid");
    }
    
      if(password){
    
        if(password.length < 8 ){
          return customResponse(res, "Password must be at least 8 characters");
        }
        if(password.length > 16){
          return customResponse(res, "Password must be at most 16 characters");
        }
        if(!/[a-z]/.test(password)){
    
          return customResponse(res, "Password must contain at least one lowercase letter");
    
        }
    
        if(!/[A-Z]/.test(password)){
          return customResponse(res, "Password must contain at least one uppercase letter");
        }
    
        if(!/[0-9]/.test(password)){
          return customResponse(res, "Password must contain at least one number");
        }
    
        if(!/[!@#$%^&*]/.test(password)){
          return customResponse(res, "Password must contain at least one special character");
        }
        
      }

  
    try {
      const user = await User
        .findOne({ email: email });

        if (!user) {
            return customResponse(res, "User not found", null, 404, false);
            }
            if (!user.emailVerified) {
            return customResponse(res, "Please verify your email");
            }
      if (!password) {
        return customResponse(res, "Password is required");
      }

      if(!user.password){
        return customResponse(res, "Password is required");
      }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {   
            return customResponse(res, "Invalid  password");
        }
        let token = generateToken(user._id);
        user.token = token;
        const updatedUser = await user.save();
        return customResponse(res, "Login successful", updatedUser, 200, true);
    }
    catch (err) {
        return customResponse(res, err.message, null, 500, false);
    }
}

// logout controller


export const logout = async (req, res) => {
  try {
    // Ensure `req.user` is populated via middleware if using JWT
    const userId = req.user ? req.user._id : req.query.userId; // Handle token-based or query param-based logout
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

   
    await user.save();

    return res.status(200).json({ success: true, message: "Logout successful." });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};






// forgot password controller

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user
        = await
        User.findOne({ email: email });

        if (!user) {
            return customResponse(res, "User not found", null, 404, false);
        }
        let emailToken = uuidv4();
        user.emailToken = emailToken;
        user.email_sent_at = new Date();
        const updatedUser = await user.save();
        forgetpwd({
            to: updatedUser.email,
            subject: "Reset your password",
            store_name:"Cretiveabhi13_Dashboard",
            name: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            link: `${process.env.website}/resetPassword/${updatedUser.emailToken}`,
        });
        return customResponse(res, "Reset password link sent to your email", updatedUser.emailToken, 200, true);
    }
    catch (err) {
        return customResponse(res, err.message, null, 500, false);
    }

}

// reset password controller

export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const emailToken = req.params.token;

  console.log('Received Email Token:', emailToken); // Debugging log

  try {
    if (!emailToken) {
      return customResponse(res, "Invalid token", null, 400, false);
    }

    const user = await User.findOne({ emailToken: emailToken.trim() });
   

    if (!user) {
      console.log('User not found for the token:', emailToken); // Debugging log
      return customResponse(res, "Invalid token", null, 400, false);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.emailToken = ""; // Clear the token

    const updatedUser = await user.save();
    updatepwd({
        to: updatedUser.email,
        subject: "Password reset successful",
        store_name:"Cretiveabhi13_Dashboard",
        name: updatedUser.username,
        email: updatedUser.email,
    });
  

    return customResponse(res, "Password reset successful", updatedUser, 200, true);
  } catch (err) {
    console.error('Error during password reset:', err);
    return customResponse(res, "An error occurred during password reset", null, 500, false);
  }
}