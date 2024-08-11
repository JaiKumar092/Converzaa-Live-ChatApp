const express =require('express');
const expressAsyncHandler = require("express-async-handler");
const userModel=require("../models/userModel");
const generateToken =require("../Config/generateToken")

const loginController = expressAsyncHandler(async (req,res)=>{
    const {name,password}=req.body;
    const user=await userModel.findOne({name});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error("Invalid UserName or Password");
    }
});

const registerController = expressAsyncHandler (async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw Error("All necessary input fields have not been filled.")
    }

    const userExist= await userModel.findOne({email});
    if(userExist){
          res.status(400);
          throw Error("User already exist");
    }

    const userNameExist= await userModel.findOne({name});
    if(userNameExist){
        res.status(400);
        throw Error("UserName already taken");
    }

    const user= await userModel.create({name,email,password});
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Registration Error");
    }
});

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    console.log("A");
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    console.log("A");
    const users = await userModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    console.log("A");
    console.log(users);
    res.send(users);
  });

module.exports ={loginController, registerController, fetchAllUsersController};