import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateActiveToken = (payload: object) => jwt.sign(payload, `${process.env.ACTIVE_SECRET_TOKEN}`, { expiresIn: "5m" });

export const generateAccessToken = (payload: object) => jwt.sign(payload, `${process.env.ACCESS_SECRET_TOKEN}`, { expiresIn: "15m" });

export const generateRefreshToken = (payload: object, res: Response) => {
 const refresh_token = jwt.sign(payload, `${process.env.REFRESH_SECRET_TOKEN}`, { expiresIn: "30d" });

 res.cookie('refreshtoken', refresh_token, {
  httpOnly: true,
  path: `/api/refresh_token`,
  maxAge: 30*24*60*60*1000 // 30d
 });
  
 return refresh_token;
}