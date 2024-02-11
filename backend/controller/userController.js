
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';


//create new user function
const registerUser = async (req, res) => {
       try {
              //validate request body
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              const { name, email, password} = req.body;
              const user = await User.findOne({email});
       
              if(user){
                     res.status(403).json({message:" Forbidden User already exists!"});
              }else{
                     const newUser = await User.create({
                            name,
                            email,
                            password,
                            tasks:[]
                     });
       
                     if (newUser) {
                            generateToken(res, newUser._id)
                            res.status(201).json({
                                   name:newUser.name,
                                   email:newUser.email,
                                   tasks:newUser.tasks
                            });
                     } else {
                            res.status(500);
                            throw new Error('Invalid user data');
                     }
              }  
       } catch (e) {
              res.status(500).json({message:e.message});
       }
}

//login user function
const loginUser = async (req, res) => {

       try{
              //validate request body
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              const { email, password} = req.body;
              const user = await User.findOne({email});

              if(user && (await user.matchPassword(password)) ){
                     generateToken(res, user._id);
                     res.status(200).json({
                            name:user.name,
                            email:user.email,
                            tasks:user.tasks
                     })
              }else{
                     res.status(401).json({message:"Invalid Credentials!"});
              }
       }catch (e) {
              res.status(500).json({message:e.message});
       }
       
}


//get user function
const getUser = async (req, res) => {
       try{
              const user = await User.findById(req.user._id);
              if(user){
                     res.status(200).json(user);
              }else{
                     res.status(404).json({message:"Not Found"});
              }
       }catch(e){
              res.status(500).json({message:e.message});
       }
       
       
}

//update user function
const updateUser = async (req,res) => {

       try {
              //validate request body
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              const { name, email, password} = req.body;
              const user = await User.findById(req.user._id);

              if(user){
                     user.name = name || user.name;
                     user.email = email || user.email;
                     user.password = password || user.password;

                     const updatedUser = await user.save();
                     res.status(201).json({name:updatedUser.name,email:updatedUser.email,tasks:updatedUser.tasks});
              }else{
                     res.status(404).json({message:'User not found!'});
              }
       } catch (e) {
              res.status(500).json({message:e.message});
       }

}

//logout user function
const logoutUser = async (req, res) => {
       try {
           res.cookie("jwt","", {
              httpOnly:true,
              expires: new Date(0)
           })   
           res.status(200).json({message:'Logged out successfully'})

       } catch (e) {
              res.status(500).json({message:e.message});
       }   
}


//delete user function
const deleteUser = async (req, res) => {

       try {

              //validate request body
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
              }

              const password = req.query.password;

              const user = await User.findById(req.user._id);

              if(user && (await user.matchPassword(password))){
                     res.cookie("jwt","", {
                            httpOnly:true,
                            expires: new Date(0)
                     })   
                     const deletedUser = await User.deleteOne({_id:user._id})
                     res.status(200).json({message:'User deleted',user:deletedUser});
              }else{
                     res.status(404).json({message:'User not found!'});
              }
       } catch (e) {
              res.status(500).json({message:e.message});
       }
}


export { registerUser, loginUser, updateUser, deleteUser, getUser, logoutUser };

