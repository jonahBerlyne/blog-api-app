import { Request, Response } from "express";
import { ReqAuthInt } from "../config/interface";
import userModel from "../models/userModel";

export const updateUser = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication' });

 try {
  const { avatar, name } = req.body;

  await userModel.findOneAndUpdate({ _id: req.user._id }, {
   avatar, name
  });

  res.json({ msg: 'Update successful' });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}