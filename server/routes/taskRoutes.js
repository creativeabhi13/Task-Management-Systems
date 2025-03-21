import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  updateStatus,
  getTask,
} from '../controllers/taskController.js';
import { isAuthenticated } from '../middleware/authmiddleware.js';

const taskRoutes = express.Router();

// Routes for tasks
taskRoutes.post('/', isAuthenticated, createTask);
taskRoutes.get('/', isAuthenticated, getTasks);
taskRoutes.get('/:id', isAuthenticated, getTask);
taskRoutes.put('/:id', isAuthenticated, updateTask);
taskRoutes.delete('/:id', isAuthenticated, deleteTask);
taskRoutes.put('/updateStatus/:id', isAuthenticated, updateStatus);

export default taskRoutes;
