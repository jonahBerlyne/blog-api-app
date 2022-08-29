import { BlogInt } from "../../utils/tsDefs";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";
export const GET_BLOGS_BY_CATEGORY_ID = "GET_BLOGS_BY_CATEGORY_ID";
export const GET_BLOGS_BY_USER_ID = "GET_BLOGS_BY_USER_ID";
export const CREATE_BLOGS_BY_USER_ID = "CREATE_BLOGS_BY_USER_ID";
export const DELETE_BLOGS_BY_USER_ID = "DELETE_BLOGS_BY_USER_ID";

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
 search: string;
}

export interface GetBlogsCategoryTypeInt {
 type: typeof GET_BLOGS_BY_CATEGORY_ID;
 payload: BlogsCategoryInt;
}

export interface BlogsUserInt {
 id: string;
 blogs: BlogInt[];
 total: number;
 search: string;
}

export interface GetBlogsUserTypeInt {
 type: typeof GET_BLOGS_BY_USER_ID;
 payload: BlogsUserInt;
}

export interface CreateBlogsUserTypeInt {
 type: typeof CREATE_BLOGS_BY_USER_ID;
 payload: BlogInt;
}

export interface DeleteBlogsUserTypeInt {
 type: typeof DELETE_BLOGS_BY_USER_ID;
 payload: BlogInt;
}

export type BlogUserType = GetBlogsUserTypeInt | CreateBlogsUserTypeInt | DeleteBlogsUserTypeInt;