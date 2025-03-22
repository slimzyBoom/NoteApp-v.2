import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  category: Types.ObjectId;
  user: Types.ObjectId
}

const NoteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<INote>(
  "Note",
  NoteSchema
)