const bcrypt=require('bcrypt');
const User = require('../models/User');

const register=async({name,password,email})=>{
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    const hashedPassowrd=await bcrypt.hash('password',10);
    const user = await User.create({
        name,email,password:hashedPassword
    });
    user.password=undefined;

    return user;
}

const fetchUsers=async()=>{
    const users=await User.find({});
    return users;
}

const update=async({id,name,email})=>{
    const user=await User.findById(id);
    if(!user){
        throw new Error("User not found");
    }
    if(name) user.name=name;
    if(email) user.email=email;
    await user.save();

    user.password=undefined;
    return user;
}

const checkMail=async({email})=>{
    const user = await User.findOne({email});
    if(user){
        throw new Error("This E-mail is already in use")
    };
    return user;
}

module.exports={register,fetchUsers,update,checkMail};