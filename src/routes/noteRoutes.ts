import express from "express";
import { getNotes, getNoteById, createNote, deleteNote, updateNote, getNoteByCategory } from "../controllers/noteController";
import { validateRequest, validateNote } from "../middleware/validation";

const router = express.Router();

router.get("/notes", getNotes)
router.get("/notes/:id", getNoteById);
router.get("notes/category/:categoryId", getNoteByCategory)
router.post("/notes", validateRequest(validateNote), createNote)
router.put("/notes", validateRequest(validateNote), updateNote)
router.delete("notes/:id", deleteNote)

export default router;
