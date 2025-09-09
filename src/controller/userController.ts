import  { Request, Response } from "express";
import { IUSer, userModel } from "../model/userModel";
import bcrypt from "bcrypt"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phoneNo } = req.body;

        if (!name || !email || !password || !phoneNo) {
            res.status(400).json({ message: "Please provide all required fields: name, email, password, and phone number." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            // isLogin: false
        });

        await user.save();

        res.status(201).json({ message: "User created successfully", data: user });

    } catch (err: any) {
        res.status(500).json({ message: "An error occurred", err })
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as Partial<IUSer>;

        if (!email || !password) {
            res.status(400).json({ error: "Please provide both email and password." });
            return;
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(401).json({ error: "Invalid Credentials" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(401).json({ error: "Invalid Credentials" })
            return
        }

        user.isLogin = true;
        await user.save()

        res.status(200).json({
            message: "User Loggeedin successfully",
            id: user._id, name: user.name,
            email: user.email, isLogin: user.isLogin,
            // data: user
        })
    }
    catch (err: any) {
        res.status(500).json({ message: "Failed to login", err })
        console.log(err)
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const user = await userModel.findById(id).populate('books')

        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }

        res.status(200).json({message: "User gotten successfully", data: user})
    }
    catch (err: any) {
        res.status(500).json({message: "An error occurred", err})
    }
}

export const getAllUsers = async(req:Request, res:Response):Promise<void>=>{
    try{
      const getUsers = await userModel.find()
      res.status(200).json({message:"books user gotten successfully"})
    }catch(err:any){
        res.status(500).json({message:"An error occured trying to get user", err:err.message})
        return
    }
}

export const updateUser = async(req:Request, res:Response):Promise<void>=>{
    try{
        const {email, password, name, phoneNo, } = req.body as Partial<IUSer>
        const updateUSer = await userModel.findByIdAndUpdate(req.params.id, {email, password, name, phoneNo}, {new:true})
        if(!updateUSer){
            res.status(401).json({message:"no user found to update"})
            return
        }
        res.status(200).json({message:"user updated successfully", data:updateUSer})
    }catch(err:any){
        res.status(500).json({message:"An error occured trying to get user", err:err.message})
        return
    }

}



export const deleteAUser = async(req:Request, res:Response):Promise<void>=>{
    try{
        const deleteUser = await userModel.findByIdAndDelete(req.params.id)
        if(!deleteUser){
            res.status(404).json({message:"no user found to delete"})
            return
        }
        res.status(404).json({message:"user deleted successfully"})
        return
    }catch(err:any){
        res.status(500).json({message:"An error occured trying to get user", err:err.message})
        return
    }
}


export const deletAllUsers = async(req:Request, res:Response):Promise<void>=>{
    try{
        await userModel.deleteMany()
        res.status(200).json({message:"all users deleted successfully"})
        return
    }catch(err:any){
        res.status(500).json({message:"An error occured trying to get user", err:err.message})
        return
    }
}
