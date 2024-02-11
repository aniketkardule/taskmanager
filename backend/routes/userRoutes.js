
import express from "express";
const userRouter = express.Router();
import { protect } from "../middleware/auth.js";
import { createUserRules, loginUserRules } from "../middleware/userValidators.js";
import { registerUser, loginUser, updateUser, deleteUser, getUser, logoutUser } from "../controller/userController.js";


userRouter.post("/register", createUserRules, registerUser);
userRouter.post("/login", loginUserRules, loginUser);
userRouter.put("/", protect, updateUser);
userRouter.delete("/", protect, deleteUser);
userRouter.get("/",protect, getUser);
userRouter.post("/logout", logoutUser);


export default userRouter;