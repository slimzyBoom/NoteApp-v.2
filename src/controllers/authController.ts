import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import { IAuthPayload } from "../types/auth";

const SECRET_KEY = process.env.JWT_SECRET;

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ massage: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const payload: IAuthPayload = {
      userId: newUser.id,
      username: newUser.username,
    };
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
    res.status(201).json({
      message: "User registered successfully",
      data: {
        username,
        email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is in db
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials " });
      return;
    }

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const payload: IAuthPayload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, SECRET_KEY as string, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` });
  }
};
