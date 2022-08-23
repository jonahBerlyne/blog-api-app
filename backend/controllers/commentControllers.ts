import { Request, Response } from "express";
import commentModel from "../models/commentModel";
import { ReqAuthInt } from "../config/interface";
import mongoose from "mongoose";

export const createComment = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const {
   content,
   blog_id,
   blog_user_id
  } = req.body;

  const newComment = new commentModel({
   user: req.user._id,
   content,
   blog_id,
   blog_user_id
  });

  await newComment.save();
  
  res.json(newComment);
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const getComments = async (req: Request, res: Response) => {
 const { limit, skip } = Pagination(req);

 try {
  const data = await commentModel.aggregate([
   {
    $facet: {
     totalData: [
      { 
       $match: {
        blog_id: new mongoose.Types.ObjectId(req.params.id),
        comment_root: { $exists: false },
        reply_user: { $exists: false }
       }
      },
      {
       $lookup: {
        "from": "users",
        "localField": "user",
        "foreignField": "_id",
        "as": "user"
       }
      },
      { $unwind: "$user" },
      {
       $lookup: {
        "from": "comments",
        "let": { cm_id: "$reply_comment" },
        "pipeline": [
         { $match: { $expr: { $in: ["$_id", "$$cm_id"] } } },
          {
           $lookup: {
            "from": "users",
            "localField": "user",
            "foreignField": "_id",
            "as": "user"
           }
          },
          { $unwind: "$user" },
          {
           $lookup: {
            "from": "users",
            "localField": "reply_user",
            "foreignField": "_id",
            "as": "reply_user"
           },
          },
          { $unwind: "$reply_user" },
        ],
        "as": "reply_comment"
       }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
     ],
     totalCount: [
      {
       $match: {
        blog_id: new mongoose.Types.ObjectId(req.params.id),
        comment_root: { $exists: false },
        reply_user: { $exists: false }
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

  const comments = data[0].totalData;
  const count = data[0].count;

  let total = 0;

  if (count % limit === 0) {
   total = count / limit;
  } else {
   total = Math.floor(count / limit) + 1;
  }

  res.json({ comments, total });
 } catch (error: any) {
  return res.status(500).json({ msg: error.message });
 }
}

export const replyComment = async (req: ReqAuthInt, res: Response) => {
 if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" });

 try {
  const {
   content,
   blog_id,
   blog_user_id,
   comment_root,
   reply_user
  } = req.body;

  const newComment = new commentModel({
   user: req.user._id,
   content,
   blog_id,
   blog_user_id,
   comment_root,
   reply_user: reply_user._id
  });

  await commentModel.findOneAndUpdate({ _id: comment_root }, {
   $push: { reply_comment: newComment._id }
  });

  await newComment.save();
  
  res.json(newComment);
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