const fs = require('fs');
const {User ,Submission,Team ,Problem,ProblemSample,Event} = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async(req,res) =>{
    try{
        const{username,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password);
        const newAdmin = await User.create({
            username,
            email,
            password: hashedPassword,
            is_junior:false,
            role:'admin'
        });
        res.status(201).json({message:"Admin registered successfully",admin:newAdmin});
    
    }
    catch(error){
        console.error("Error registering admin:",error);
        res.status(500).json({message:"Internal server error"});
    }
}
