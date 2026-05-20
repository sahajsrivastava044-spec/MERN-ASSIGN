const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[50,"The name must not exceed 50 characters"],
        minLength:[2,"The name must atleast be 2 characters long"],
        trim:true
    },

    email:{
        type:String,
        required:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please provide a valid email'],
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'password must atleast be of 6 characters'],
        select:false
    }
},
{timestamps:true}
);

const User = mongoose.model('User',userSchema);
module.exports=User;