import { Request, Response } from "express";
import commentModel from "../models/commentModel";
import { ReqAuthInt } from "../config/interface";

export const createComment = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const {
   content,
   blog_id,
   blog_user_id
  } = req.body;

  const newComment = new commentModel({
   user: req.user._id,
   content,
   blog_id,
   blog_user_id
  });

  await newComment.save();
  
  res.json(newComment);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}