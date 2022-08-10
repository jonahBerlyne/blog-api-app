import jwt from "jsonwebtoken";

export const generateActiveToken = (payload: object) => jwt.sign(payload, `${process.env.ACTIVE_SECRET_TOKEN}`, { expiresIn: "5m" });

export const generateAccessToken = (payload: object) => jwt.sign(payload, `${process.env.ACCESS_SECRET_TOKEN}`, { expiresIn: "15m" });

export const generateRefreshToken = (payload: object) => jwt.sign(payload, `${process.env.REFRESH_SECRET_TOKEN}`, { expiresIn: "30d" });