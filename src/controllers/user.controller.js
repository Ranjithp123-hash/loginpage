const User = require("../model/userSchema.model");
const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

Router.post("/register", async(req,res)=> {

    try {
    
    const {user, email, password, role} = req.body;
    const ispresent = await User.findOne({email});

    if (ispresent){
        return res.send("user already registered");
    }

    const createdUser = await User.create({user, email, password, role});

     res.send(createdUser);

    } catch (error){

     res.send({error: error.message});
    
    }

})


Router.post("/login", async(req,res)=> {

    try {
    
    const {email, password} = req.body;
    const ispresent = await User.findOne({email:req.body.email});


    const compare = bcrypt.compareSync(req.body.password, ispresent.password);


    //     if (!compare){
    //         res.send("password is incorrect");
    //     }
    //    return res.send("Logged in successfully");
  

    if (!ispresent)
    {
        return res.send("user is not registered");
    }

    if (password !== ispresent.password && !compare){
        res.send("invalid password");

    }

    const payload = {userId: ispresent._id, role:ispresent.role};
    const token = jwt.sign(payload, "Ranjith", 
    {expiresIn:"3h"});

    

     res.send({message:"logged in successfully", token:token});

    } catch (error){

     res.send({error: error.message});
    
    }

})

module.exports = Router;