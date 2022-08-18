import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken, generateAccessToken, generateRefreshToken } from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { sendSMS } from "../config/sendSMS";
import { validPhone, validEmail } from "../middleware/validator";
import { UserInt, DecodedTokenInt } from "../config/interface";

export const register = async (req: Request, res: Response) => {
 try {
  const { name, account, password } = req.body;

  const user = await userModel.findOne({ account });
  if (user) return res.status(400).json({ msg: "Account already exists" });

  const hashedPassword = await bcrypt.hash(password, 15);

  const newUser = {
   name,
   account,
   password: hashedPassword
  };

  const active_token = generateActiveToken({ newUser });

  const url = `${process.env.BASE_URL}/active/${active_token}`;

  if (validEmail(account)) {
   sendEmail(account, url, "Verify your email address");
   return res.json({ msg: "Registration successful. Please check your email." });
  } else if (validPhone(account)) {
   sendSMS(account, url, "Verify your phone number");
   return res.json({ msg: "Registration successful. Please check your phone." });
  }

 } catch (error) {
  res.status(500).json({ msg: error });
 }
}

export const activateAccount = async (req: Request, res: Response) => {
 try {
  const { active_token } = req.body;

  const decoded = <DecodedTokenInt>jwt.verify(active_token, `${process.env.ACTIVE_SECRET_TOKEN}`);

  const { newUser } = decoded; // destructured directly from the interface

  if (!newUser) return res.status(400).json({ msg: "Invalid authorization" });

  const user = await userModel.findOne({ account: newUser.account });
  if (user) return res.status(400).json({ msg: "Account already exists" });

  const new_user = new userModel(newUser);

  await new_user.save();

  res.json({ msg: "Account has been activated" });

 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const login = async (req: Request, res: Response) => {
 try {
  const { account, password } = req.body;

  const user = await userModel.findOne({ account });

  if (!user) return res.status(400).json({ msg: "Account doesn't exist" });

  const match = await bcrypt.compare(password, user.password);
  
  if (!match) {
   let msgErr = user.type === 'register' ? "Incorrect password" : `Incorrect password. The account login is ${user.type}`
   return res.status(400).json({ msg: msgErr });
  }
  
  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);
  
  await userModel.findOneAndUpdate({ _id: user._id }, {
   rf_token: refresh_token
  });
  
  res.json({ 
   msg: "Login successful",
   access_token,
   user: {
    ...user._doc,
    password: ''
   } 
  });

 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}

export const logout = (req: Request, res: Response) => {
 try {
  res.clearCookie("refreshtoken", {
   path: `/api/refresh_token`
  });
  res.json({ msg: "Logged out" });
 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}

export const refreshToken = async (req: Request, res: Response) => {
 try {
  const rf_token = req.cookies.refreshtoken
  if (!rf_token) return res.status(400).json({ msg: "Please login" });

  const decoded = <DecodedTokenInt>jwt.verify(rf_token, `${process.env.REFRESH_SECRET_TOKEN}`);
  if (!decoded.id) return res.status(400).json({ msg: "Please login" });
  
  const user = await userModel.findById(decoded.id).select("-password +rf_token");
  if (!user) return res.status(400).json({ msg: "This account doesn't exist" });

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await userModel.findOneAndUpdate({ _id: user._id }, {
   rf_token: refresh_token
  });

  res.json({ access_token, user });
 } catch (error: any) {
  res.status(500).json({ msg: error.message });
 }
}