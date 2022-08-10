import { Request, Response, NextFunction } from "express";

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
 const { name, account, password } = req.body;

 if (!name) return res.status(400).json({ msg: "Please add your name" });
 if (name.length > 20) return res.status(400).json({ msg: "Your name can only be 20 characters max" });

 if (!account) return res.status(400).json({ msg: "Please add your email or phone number" });
 if (!validPhone(account) && !validEmail(account)) return res.status(400).json({ msg: "Please enter a valid email or phone number" });

 if (password.length < 5) return res.status(400).json({ msg: "Password must be at least 5 characters" });

 next();
}

export function validPhone(phone: string) {
  const re = /^[+]/g;
  return re.test(phone);
}

export function validEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}