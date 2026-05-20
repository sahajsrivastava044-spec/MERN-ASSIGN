const mongoose=require('mongoose');
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🔥 mongoDB is connected!");
    } catch (error) {
        console.log({"🔴Error":error});
        process.exit(1);
    }
}
connectDB();

module.exports=connectDB;