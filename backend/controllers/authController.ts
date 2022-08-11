import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateActiveToken } from "../config/generateToken";
import sendEmail from "../config/sendMail";
import { sendSMS } from "../config/sendSMS";
import { validPhone, validEmail } from "../middleware/validator";
import { DecodedTokenInt } from "../config/interface";

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
  const { activeToken } = req.body;

  const decoded = <DecodedTokenInt>jwt.verify(activeToken, `${process.env.ACTIVE_SECRET_TOKEN}`);

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