import mongoose from "mongoose"

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to db successfully");
    }catch(error){
        console.error("Error connectiong to MONGO DB ",error);
        process.exit(1);
    }
};