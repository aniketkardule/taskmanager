import express from "express";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
import connectDb from "./config/db.js";
import cookies  from "cookie-parser";


app.use(
    cors({
      origin: ["https://taskmanager-mmwt.onrender.com","http://localhost:3000"],
      methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
      credentials: true,
    })
  );
  
app.use(cookies());
app.use(cookieParser())

connectDb();

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})