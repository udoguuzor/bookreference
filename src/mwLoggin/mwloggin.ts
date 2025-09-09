import express, {Request, Response} from "express"


export const mwLoggin = async(req:Request, res:Response, next:any):Promise<void>=>{
 try{
    console.log("middleware Called")
    next()
 }catch(err:any){
    console.log(err)
    next(err)
 }
}