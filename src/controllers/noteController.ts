import { RequestHandler } from "express";
import Note from "../models/Note";

export const getNotes:RequestHandler = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const getNoteById: RequestHandler = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note){
      res.status(404).json({ message: "Note not found" });
      return
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving note" });
  }
};

export const createNote:RequestHandler = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content){
      res.status(400).json({ message: "Title and content are required" });
      return
    }

    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
};

export const deleteNote:RequestHandler = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id); 
    if(!note) {
      res.status(404).json({ message: "Note not found" });
      return
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};