import User from "../models/user.js";
import { validationResult } from "express-validator";

// function to create new task
const createTask = async (req,res) => {
    try {

       //validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        }

           const { task_name, start_date, end_date, status } = req.body;
           const user = await User.findById(req.user._id);
           if(user){
                  user.tasks.unshift({
                         id: user.tasks.length == 0 ? 1 : user.tasks.length + 1,
                         task_name,
                         start_date,
                         end_date,
                         status
                  });

                  const updatedUser = await user.save();
                  res.status(201).json({name:updatedUser.name,email:updatedUser.email,tasks:updatedUser.tasks});
           }
    } catch (e) {
           res.status(500).json({message:e.message});
    }
}

//function to updating existing task
const updateTask = async (req, res) => {
    try{

       //validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        }

           const { task_name, start_date, end_date, status } = req.body;
           const user = await User.findById(req.user._id);
           const taskid = parseInt(req.params.id);
           if(user){
                  var tasks = user.tasks;
                  var foundIndex = tasks.findIndex(x => x.id == taskid);
                  tasks[foundIndex] = {
                         id: taskid,
                         task_name:task_name || tasks[foundIndex].task_name,
                         start_date:start_date || tasks[foundIndex].start_date,
                         end_date:end_date || tasks[foundIndex].end_date,
                         status:status || tasks[foundIndex].status
                  }
                  const updatedTask = await user.save();

                  if(updatedTask){
                         res.status(200).json({name:user.name,email:user.email,tasks:user.tasks});
                  }else{
                         res.status(500).json({message:"Server Error!"});
                  }
           }
    }catch (e){
           res.status(500).json({message:e.message});
    }
}

//function to delete existing task
const deleteTask = async (req, res) => {
    try {

       //validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        }
        
           const task_id = parseInt(req.params.id);
           const user = await User.findById(req.user._id);
           var tasks = user.tasks;
           var foundIndex = tasks.findIndex(x => x.id == task_id);
           tasks.splice(foundIndex, 1);
           const upadtedUser = await user.save();
           res.status(200).json({name:upadtedUser.name,email:upadtedUser.email,tasks:upadtedUser.tasks});
    } catch (e) {
           res.status(500).json({message:e.message});
    }
}

//function to get all tasks
const getTasks = async (req, res) => {
       try{
              const user = req.user;
              const tasks = user.tasks;
              res.status(200).json(tasks);
       }catch(e){
              res.status(500).json({message:e.message});
       }
}

//function to geet task by id
const getTaskById = async (req, res) => {
       try{
              const id = parseInt(req.params.id);
              const user = req.user;
              const task = user.tasks.find(element => element.id == id);
              res.status(200).json(task);
       } catch (e){
              res.status(500).json({message:e.message});
       }
}

export { createTask, updateTask, deleteTask, getTasks, getTaskById }