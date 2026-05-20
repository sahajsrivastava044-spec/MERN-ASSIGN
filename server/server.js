require('dotenv').config();
const express=require('express');
const cors=require('cors');
const connectDB = require('./config/db');

const app=express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT=process.env.PORT;

app.get('/api/health',(req,res)=>{
    res.json('Welcome to the platforms API is running fine');
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
});

