import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';



const routes = express.Router();



routes.use('/auth', authRoutes);

routes.use('/user',userRoutes);


routes.use('/task',taskRoutes);



export default routes;