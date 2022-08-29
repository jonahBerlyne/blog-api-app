import { Request, Response } from "express";
import categoryModel from "../models/categoryModel";
import { ReqAuthInt } from "../config/interface";
import blogModel from "../models/blogModel";

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
  }, { name: (req.body.name).toLowerCase() });

  res.json({ msg: "Update successful" });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const deleteCategory = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const blog = await blogModel.findOne({ category: req.params.id });

  if (blog) return res.status(400).json({ msg: "Unable to delete category due to blogs existing inside the category. Please delete the blogs within the category before deleting the category itself." });

  const category = await categoryModel.findByIdAndDelete(req.params.id);

  if (!category) return res.status(400).json({ msg: "Category doesn't exist" });

  res.json({ msg: "Category deleted" });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}