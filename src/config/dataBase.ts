import mongoose from "mongoose"

const connectDB = async():Promise<void>=>{
    const MONGODB_URL = process.env.MONGODB_URL
    if(!MONGODB_URL){
        console.error("Missing MONGODB_URL in .env");
        throw new Error("Missing MONGODB_URL in .env")
    }
    try{
        await mongoose.connect(MONGODB_URL)
        console.log("connected to DB")
    }catch(err:any){
        console.error("An error occured connecting to server", err.message)
        throw err
    }
}


export default connectDB