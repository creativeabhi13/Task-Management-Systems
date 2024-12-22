import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
} from '../controllers/taskController.js';
import { isAuthenticated } from '../middleware/authmiddleware.js';


const taskRoutes = express.Router();

taskRoutes.post('/',isAuthenticated, createTask);
taskRoutes.get('/', isAuthenticated, getTasks);
taskRoutes.put('/:id',isAuthenticated, updateTask);
taskRoutes.delete('/:id',isAuthenticated, deleteTask);
taskRoutes.get('/filter',isAuthenticated, filterTasks);

export default taskRoutes;