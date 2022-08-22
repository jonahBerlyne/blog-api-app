import { Request, Response } from "express";
import blogModel from "../models/blogModel";
import { ReqAuthInt } from "../config/interface";

export const createBlog = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const { title, content, description, thumbnail, category } = req.body;

  const newBlog = new blogModel({
   user: req.user._id,
   title,
   content,
   description,
   thumbnail,
   category
  });

  await newBlog.save();
  
  res.json({ newBlog });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}