import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { validPhone, validEmail } from "../middleware/validator";

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

  const activeToken = generateActiveToken({ newUser });

  const url = `${process.env.BASE_URL}/active/${activeToken}`;

  if (validEmail(account)) {
   sendEmail(account, url, "Verify your email address");
   return res.json({ msg: "Registration successful. Please check your email." });
  }

 } catch (error) {
  res.status(500).json({ msg: error });
 }
}