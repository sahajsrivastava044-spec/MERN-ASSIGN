const User = require("../models/User");
const { register, fetchUsers, checkMail } = require("../services/user.service");

const registerUser=async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const data=await register({name,email,passowrd});
    res.status(201).json({message:"🎉Congrats! User has been registered",data:user});
    }catch(error){
        return res.status(500).json({"🔴Error":error})
    }
}

const getAllUsers=async(req,res)=>{
    try {
        const users=await fetchUsers();
        res.json({message:"Data fetched successfully"})
    } catch (error) {
        return res.status(500).json({"🔴Error":error})
    }
}

const updateUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,email}=req.body;
    } catch (error) {
        res.status(500).json({"🔴Error":error})
    }
}

const checkEmail=async(req,res)=>{

        const {email}=req.params;
        const eligible=await checkMail(email);
        if(eligible){
            return res.status(200).json({message:"Email available"})
        }
        return res.status(400).json({message:"Email already in use"});
}