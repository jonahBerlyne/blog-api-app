import { Dispatch } from "redux";
import { getAPI, postAPI } from "../../utils/FetchData";
import { BlogInt } from "../../utils/tsDefs";
import { uploadImg } from "../../utils/UploadImg";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { GetBlogsCategoryTypeInt, GetHomeBlogsTypeInt, GET_BLOGS_BY_CATEGORY_ID, GET_HOME_BLOGS, GET_BLOGS_BY_USER_ID, GetBlogsUserTypeInt } from "../types/blogTypes";

export const createBlog = (blog: BlogInt, token: string) => async (dispatch: Dispatch<AlertTypeInt>) => {
 let url = '';

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  if (typeof(blog.thumbnail) !== 'string') {
   const photo = await uploadImg(blog.thumbnail);
   url = photo.url;
  } else {
   url = blog.thumbnail;
  }

  const newBlog = {
   ...blog,
   thumbnail: url
  };

  await postAPI('blog', newBlog, token);

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const getHomeBlogs = () => async (dispatch: Dispatch<AlertTypeInt | GetHomeBlogsTypeInt>) => {
 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await getAPI('home/blogs');

  dispatch({
   type: GET_HOME_BLOGS,
   payload: res.data
  });

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const getBlogsByCategoryID = (id: string, search: string) => async (dispatch: Dispatch<AlertTypeInt | GetBlogsCategoryTypeInt>) => {
 try {
  let limit = 8;
  let value = search ? search : '?page=1';

  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);

  dispatch({
   type: GET_BLOGS_BY_CATEGORY_ID,
   payload: {
    ...res.data, 
    id,
    search
   }
  });

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}

export const getBlogsByUserID = (id: string, search: string) => async (dispatch: Dispatch<AlertTypeInt | GetBlogsUserTypeInt>) => {
 try {
  let limit = 3;
  let value = search ? search : '?page=1';

  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);

  dispatch({
   type: GET_BLOGS_BY_USER_ID,
   payload: {
    ...res.data, 
    id,
    search
   }
  });

  dispatch({
   type: ALERT,
   payload: {
    loading: false
   }
  });
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}