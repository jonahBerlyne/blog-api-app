import { Request, Response, NextFunction } from "express";

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
 const { name, account, password } = req.body;

 let errors = [];

 if (!name) errors.push("Please add your name" );
 else if (name.length > 20) errors.push("Your name can only be 20 characters max");

 if (!account) errors.push("Please add your email or phone number");
 else if (!validPhone(account) && !validEmail(account)) errors.push("Please enter a valid email or phone number");

 if (password.length < 5) errors.push("Password must be at least 5 characters");

 if (errors.length > 0) return res.status(400).json({ msg: errors });

 next();
}

export function validPhone(phone: string) {
  const regExp = /^[+]/g;
  return regExp.test(phone);
}

export function validEmail(email: string) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}