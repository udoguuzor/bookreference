import express, { Router } from "express"
import { deletAllUsers, deleteAUser, getAllUsers, getUser, loginUser, registerUser, updateUser } from "../controller/userController"

export const userRouter:Router = express.Router()

userRouter.post("/create", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/getOne/:id", getUser)
userRouter.get("/getAll", getAllUsers)
userRouter.patch("/update/:id",updateUser )
userRouter.delete("/delete/:id", deleteAUser)
userRouter.delete("/deleteAll", deletAllUsers)
