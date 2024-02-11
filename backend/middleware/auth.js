
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//create middleware to authenticate user
const protect = async (req, res, next) => {
    try{

        const token = req.cookies.jwt;

        if(token){
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //set user property to request object.
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        }else{
            res.status(402).json({"message":"Invalid Token"});
        }
    }catch (e){
        res.status(402).json({"message":e});
    }
}

export { protect } ;