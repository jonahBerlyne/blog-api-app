import { Response, NextFunction } from "express";
import userModel from "../models/userModel";
import jwt from 'jsonwebtoken';
import { DecodedTokenInt, ReqAuthInt } from "../config/interface";

const auth = async (req: ReqAuthInt, res: Response, next: NextFunction) => {
 try {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ msg: 'Invalid Authentication' });

  const decoded = <DecodedTokenInt>jwt.verify(token, `${process.env.ACCESS_SECRET_TOKEN}`);

  if (!decoded) return res.status(400).json({ msg: 'Invalid Authentication' });

  const user = await userModel.findOne({ _id: decoded.id }).select("-password");
  if (!user) return res.status(400).json({ msg: 'User doesn\'t exist' });

  req.user = user;
  
  next();
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export default auth;