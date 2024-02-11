import express from 'express';
import { protect } from '../middleware/auth.js';
import { createTask, updateTask, deleteTask, getTasks, getTaskById } from '../controller/tasks.js';
import { addTaskRules } from '../middleware/taskValidators.js';

const taskRouter = express.Router();

taskRouter.get('/', protect, getTasks);
taskRouter.get('/:id', protect, getTaskById);
taskRouter.post('/', addTaskRules, protect, createTask);
taskRouter.put('/:id', protect, updateTask);
taskRouter.delete('/:id', protect, deleteTask);

export default taskRouter;
