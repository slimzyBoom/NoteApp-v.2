import { RequestHandler, Response } from "express";
import Note from "../models/Note";
import Category from "../models/Category";
import mongoose from "mongoose";
import { AuthInterface } from "../middleware/authMiddleware";

export const getNotes: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" }); // Ensure user is defined
      return;
    }
    const notes = await Note.find({ user: req.user.userId }).populate(
      "category"
    ); // Fetch only user's notes
    if (notes.length === 0) {
      res.json({ message: "There is no note available" });
      return;
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const getNoteById: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }); // Ensure note belongs to user
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving note" });
  }
};

export const createCategory: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
};

export const getAllCategories: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const categories = await Category.find({});
    if (categories.length === 0) {
      res.status(404).json({ message: "No categories found" });
      return;
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const getNoteByCategory: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const categoryId = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    const notes = await Note.find({
      category: categoryId,
      user: req.user.userId,
    });

    if (notes.length === 0) {
      res.status(404).json({ message: "No notes found in this category" });
      return;
    }

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes by category" });
  }
};

export const createNote: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!category) {
      const defaultCategory = await Category.findOne({ name: "General" });

      if (!defaultCategory) {
        const newCategory = new Category({ name: "General" });
        await newCategory.save();
        req.body.category = newCategory._id;
      } else {
        req.body.category = defaultCategory._id;
      }
    }

    const newNote = new Note({
      title,
      content,
      category : req.body.category,
      user: req.user.userId,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: `Error creating note : ${err.message}` });
  }
};

export const updateNote: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    const { title, content, categoryId } = req.body;

    // Validate if all field is missing
    if (!title && !content && !categoryId) {
      res
        .status(400)
        .json({ message: "Title, content, and category ID are required" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
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
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Ensure user owns the note before updating
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!note) {
      res.status(404).json({ message: "Note not found or unauthorized" });
      return;
    }

    // Update Note
    note.title = title;
    note.content = content;
    note.category = categoryId;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
};

// ✅ Delete Note - Only Owner Can Delete
export const deleteNote: RequestHandler = async (
  req: AuthInterface,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    }); // Ensure only owner can delete
    if (!note) {
      res.status(404).json({ message: "Note not found or unauthorized" });
      return;
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
