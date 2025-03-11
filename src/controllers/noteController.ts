import { RequestHandler } from "express";
import Note, { INote } from "../models/Note";
import Category from "../models/Category";
import mongoose from "mongoose";

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

export const getNoteByCategory:RequestHandler = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return
    }
    const notes = await Note.find({category: categoryId})

    if(notes.length === 0){
      res.status(404).json({
        message: "No notes found in this category"
      })
      return
    }

    res.json(notes)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes by category"
    })
  }
}

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

export const updateNote: RequestHandler = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;

    // Validate required fields
    if (!title || !content || !categoryId) {
      res.status(400).json({
        message: "Title, content, and category ID are required",
      });
      return;
    }

    // Validate Note ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Invalid note ID" });
      return;
    }

    // Validate Category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

    // Update Note
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        category: category._id, // Store ObjectId, not an object
      },
      { new: true } // Return updated document
    );

    // Check if note exists
    if (!updatedNote) {
      res.status(404).json({
        message: "Note not found",
      });
      return;
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
    });
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