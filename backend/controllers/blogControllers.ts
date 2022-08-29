import { Request, Response } from "express";
import blogModel from "../models/blogModel";
import { ReqAuthInt } from "../config/interface";
import mongoose from "mongoose";
import commentModel from "../models/commentModel";

export const createBlog = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const { title, content, description, thumbnail, category } = req.body;

  const newBlog = new blogModel({
   user: req.user._id,
   title: title.toLowerCase(),
   content,
   description,
   thumbnail,
   category
  });

  await newBlog.save();
  
  res.json({ 
   ...newBlog._doc,
   user: req.user
  });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getHomeBlogs = async (req: Request, res: Response) => {
 try {
  const blogs = await blogModel.aggregate([
   // user
   {
    $lookup: {
     from: "users",
     let: { user_id: "$user" },
     pipeline: [
      { $match: { $expr: { $eq: ["$_id", "$$user_id"] } }},
      { $project: { password: 0 } }
     ],
     as: "user"
    }
   },
   // array -> object
   { $unwind: "$user" },
   // category
   {
    $lookup: {
     from: "categories",
     "localField": "category",
     "foreignField": "_id",
     "as": "category"
    }
   },
   // array -> object
   { $unwind: "$category" },
   // sorting
   { $sort: { "createdAt": -1 }},
   // group by category
   {
    $group: {
     _id: "$category._id",
     name: { $first: "$category.name" },
     blogs: { $push: "$$ROOT" },
     count: { $sum: 1 }
    }
   },
   // Pagination for blogs
   {
    $project: {
     blogs: {
      $slice: ['$blogs', 0, 4]
     },
     count: 1,
     name: 1
    }
   }
  ]);
  res.json(blogs);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getBlogsByCategory = async (req: Request, res: Response) => {
 const { limit, skip } = Pagination(req);
 
 try {
  const Data = await blogModel.aggregate([
   {
    $facet: {
     totalData: [
      { 
       $match: { 
        category: new mongoose.Types.ObjectId(req.params.id) 
       } 
      },
      // user
      {
       $lookup: {
        from: "users",
        let: { user_id: "$user" },
        pipeline: [
         { $match: { $expr: { $eq: ["$_id", "$$user_id"] } }},
         { $project: { password: 0 } }
        ],
        as: "user"
       }
      },
      // array -> object
      { $unwind: "$user" },
      // Sorting
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
     ],
     totalCount: [
      { 
       $match: { 
        category: new mongoose.Types.ObjectId(req.params.id) 
       } 
      },
      { $count: 'count' }
     ]
    }
   },
   {
    $project: {
     count: { $arrayElemAt: ["$totalCount.count", 0] },
     totalData: 1
    }
   }
  ]);

  const blogs = Data[0].totalData;
  const count = Data[0].count;

  // Pagination
  let total = 0;

  if (count % limit === 0) {
   total = count / limit;
  } else {
   total = Math.floor(count / limit) + 1;
  }

  res.json({ blogs, total });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getBlogsByUser = async (req: Request, res: Response) => {
 const { limit, skip } = Pagination(req);
 
 try {
  const Data = await blogModel.aggregate([
   {
    $facet: {
     totalData: [
      { 
       $match: { 
        user: new mongoose.Types.ObjectId(req.params.id) 
       } 
      },
      // user
      {
       $lookup: {
        from: "users",
        let: { user_id: "$user" },
        pipeline: [
         { $match: { $expr: { $eq: ["$_id", "$$user_id"] } }},
         { $project: { password: 0 } }
        ],
        as: "user"
       }
      },
      // array -> object
      { $unwind: "$user" },
      // Sorting
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
     ],
     totalCount: [
      { 
       $match: { 
        user: new mongoose.Types.ObjectId(req.params.id) 
       } 
      },
      { $count: 'count' }
     ]
    }
   },
   {
    $project: {
     count: { $arrayElemAt: ["$totalCount.count", 0] },
     totalData: 1
    }
   }
  ]);

  const blogs = Data[0].totalData;
  const count = Data[0].count;

  // Pagination
  let total = 0;

  if (count % limit === 0) {
   total = count / limit;
  } else {
   total = Math.floor(count / limit) + 1;
  }

  res.json({ blogs, total });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getBlog = async (req: Request, res: Response) => {
 try {
  const blog = await blogModel
  .findOne({ _id: req.params.id })
  .populate("user", "-password");

  if (!blog) return res.status(400).json({ msg: "Blog doesn't exist" });

  res.json(blog);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const updateBlog = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const blog = await blogModel.findOneAndUpdate({
   _id: req.params.id,
   user: req.user._id
  }, req.body);

  if (!blog) return res.status(400).json({ msg: "Invalid Authentication" });

  res.json({ msg: 'Update successful', blog });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const deleteBlog = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const blog = await blogModel.findOneAndDelete({
   _id: req.params.id,
   user: req.user._id
  });

  if (!blog) return res.status(400).json({ msg: "Invalid Authentication" });

  await commentModel.deleteMany({ blog_id: blog._id });
  res.json({ msg: 'Delete successful' });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

const Pagination = (req: ReqAuthInt) => {
 let page = Number(req.query.page) * 1 || 1;
 let limit = Number(req.query.limit) * 1 || 4;
 let skip = (page - 1) * limit;

 return {
  page,
  limit,
  skip
 };
}