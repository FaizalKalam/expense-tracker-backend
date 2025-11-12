import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';



export const registerUser = async(req,res,next) =>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
        res.status(201).json({message:"User registered successfully"});
    } catch (err) {
        next(err);
    }
};

export const loginUser =async (req,res,next)=>{
    try {
        const jwtsecret= process.env.JWT_SECRET;
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(404).json({error:"User not found"});
        }
        

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({error:"Invalid password"});
        }
        const token = jwt.sign({id:user._id},jwtsecret,{expiresIn:"1h"});
        res.json({message:"Login successfull",token});    
    } catch (err) {
        next(err);
    }
    
};

export const dashboard = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).select('name email _id');
      if (!user) {
        return res.status(404).json({error:'user not found'});
      }
      res.json({ message: "Welcome to the dashboard!",
        user:user
       });     
    } catch (err) {
        next(err);
    }     
    };

// update user profile
export const updateProfile = async (req, res, next) => {
    try {
      const { name, email } = req.body; // pick fields you want to allow updating
  
      const updatedUser = await User.findByIdAndUpdate(
        req.userId, 
        { name, email }, 
        { new: true, runValidators: true }
      ).select("name email _id"); // only return safe fields
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({
        message: "Profile updated successfully",
        user: updatedUser
      });
    } catch (err) {
      next(err);
    }
  };
  