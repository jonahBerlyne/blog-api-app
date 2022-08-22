import { Request, Response } from "express";
import { ReqAuthInt } from "../config/interface";
import userModel from "../models/userModel";
import bcrypt from 'bcrypt';

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

export const resetPassword = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication' });

 if (req.user.type !== 'register') return res.status(400).json({ msg: `Quick login with ${req.user.type} can't use this function` });

 try {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 15);

  await userModel.findOneAndUpdate({ _id: req.user._id }, {
   password: hashedPassword
  });

  res.json({ msg: 'Password reset' });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getUser = async (req: Request, res: Response) => {
 try {
  const user = await userModel.findById(req.params.id).select('-password')
  res.json(user);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}