
import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authmiddleware.js';

const userRoutes = express.Router();


userRoutes.get('/profile/:id',isAuthenticated,getUser);


userRoutes.put('/:id',isAuthenticated,updateUser);


export default userRoutes;  

