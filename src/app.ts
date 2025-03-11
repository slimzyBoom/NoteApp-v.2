import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db";
import noteRoutes from "./routes/noteRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

dotenv.config();
connectDB();

const app = express();
app.use(requestLogger)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The server is active")
})
app.use("/api", noteRoutes);
app.use(errorHandler);

export default app;