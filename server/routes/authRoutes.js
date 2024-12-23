import express from 'express';
import { forgotPassword, login, logout, resetPassword, signup, verifyEmail } from '../controllers/authControllers.js';
import { isAuthenticated } from '../middleware/authmiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/signup',signup);

authRoutes.post ('/login',login);

authRoutes.get('/verifyEmail/:token',verifyEmail);

authRoutes.post('/forgotPassword',forgotPassword);

authRoutes.post('/resetPassword/:token',resetPassword);

authRoutes.get('/logout/',isAuthenticated,logout);







export default authRoutes;