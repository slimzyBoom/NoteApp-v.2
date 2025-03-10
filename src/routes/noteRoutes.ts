import express from "express";
import { getNotes, getNoteById, createNote, deleteNote } from "../controllers/noteController";

const router = express.Router();

router.get("/notes", getNotes)
router.get("/notes/:id", getNoteById);
router.post("/notes", createNote)
router.delete("notes/:id", deleteNote)

export default router;
