import express from "express";
import { getNotes, getNoteById, createNote, deleteNote, updateNote, getNoteByCategory, createCategory, getAllCategories } from "../controllers/noteController";
import { validateRequest, validateNote } from "../middleware/validation";

const router = express.Router();

router.get("/category", getAllCategories);
router.get("/category/:categoryId", getNoteByCategory);
router.get("/:id", getNoteById);
router.get("/", getNotes);

router.post("/category", createCategory);
router.post("/", validateRequest(validateNote), createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;
