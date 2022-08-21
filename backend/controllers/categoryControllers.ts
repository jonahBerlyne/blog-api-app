import { Request, Response } from "express";
import categoryModel from "../models/categoryModel";
import { ReqAuthInt } from "../config/interface";

export const createCategory = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const name = req.body.name.toLowerCase();

  const newCategory = new categoryModel({ name });
  await newCategory.save();

  res.json({ newCategory });
 } catch (error: any) {
  let errMsg;
  if (error.code === 11000) {
   errMsg = Object.values(error.keyValue)[0] + " already exists";
  } else {
   let name = Object.keys(error.errors)[0];
   errMsg = error.errors[`${name}`].message;
  }
  return res.status(500).json({ msg: errMsg });
 }
}

export const getCategories = async (req: Request, res: Response) => {
 try {
  const categories = await categoryModel.find().sort("-createdAt");
  res.json({ categories });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const updateCategory = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  await categoryModel.findOneAndUpdate({ 
   _id: req.params.id
  }, { name: req.body.name });

  res.json({ msg: "Update successful" });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const deleteCategory = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  await categoryModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Category deleted" });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}