
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const userSchema = mongoose.Schema(
{
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    tasks:[
        {
            id: Number,
            task_name:String,
            start_date:String,
            end_date:String,
            status:String,
            details:String
        }
    ]
});

//method to compare password while user login
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//function to hash password during registering new user
userSchema.pre("save", async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)

})

const user = mongoose.model('User', userSchema);

export default user;