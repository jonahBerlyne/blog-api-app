import { BlogInt } from "../../utils/tsDefs";

export const GET_HOME_BLOGS = "GET_HOME_BLOGS";

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