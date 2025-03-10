import { Request, Response } from "express";
import Note from "../models/Note";

export const getNotes = async (req:Request, res:Response) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes"
    })
  }
}