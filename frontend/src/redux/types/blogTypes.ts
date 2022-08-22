import { BlogInt } from "../../utils/tsDefs";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";

export interface HomeBlogsInt {
 _id: string;
 name: string;
 count: number;
 blogs: BlogInt[];
}

export interface GetHomeBlogsTypeInt {
 type: typeof GET_HOME_BLOGS;
 payload: HomeBlogsInt[];
}

export interface BlogsCategoryInt {
 id: string;
 blogs: BlogInt[];
 total: number;
}

export interface GetBlogsCategoryTypeInt {
 type: typeof GET_BLOGS_BY_CATEGORY_ID;
 payload: BlogsCategoryInt;
}