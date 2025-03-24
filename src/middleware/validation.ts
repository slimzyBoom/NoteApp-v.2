import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";

type Validator<T> = (data: T) => { valid: boolean, message?: string }

export const validateRequest = <T>(validator: Validator<T>) :RequestHandler => ( req:Request, res:Response, next:NextFunction) => {
  const validation = validator(req.body);
  if(!validation.valid){
    res.status(400).json({ message: validation.message })
    return
  }
  next();
}

// Validation Logic
export const validateNote = (data: { title: string; content: string; categoryId: string}) => {
  if(!data.title || !data.content ){
    return { valid: false, message: "Title and content are required "}
  }

   // Validate if categoryId is a valid ObjectId
   if (!mongoose.Types.ObjectId.isValid(data.categoryId)) {
    return { valid: false, message: "Invalid categoryId format" };
  }
  return { valid: true }
}     