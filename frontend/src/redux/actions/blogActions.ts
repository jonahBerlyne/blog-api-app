import { Dispatch } from "redux";
import { checkTokenExp } from "../../utils/checkTokenExp";
import { getAPI, putAPI, postAPI, deleteAPI } from "../../utils/FetchData";
import { BlogInt } from "../../utils/tsDefs";
import { uploadImg } from "../../utils/UploadImg";
import { ALERT, AlertTypeInt } from "../types/alertTypes";
import { GetBlogsCategoryTypeInt, GetHomeBlogsTypeInt, GET_BLOGS_BY_CATEGORY_ID, GET_HOME_BLOGS, GET_BLOGS_BY_USER_ID, GetBlogsUserTypeInt, CREATE_BLOGS_BY_USER_ID, CreateBlogsUserTypeInt, DeleteBlogsUserTypeInt, DELETE_BLOGS_BY_USER_ID } from "../types/blogTypes";

export const createBlog = (blog: BlogInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | CreateBlogsUserTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

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

  const res = await postAPI('blog', newBlog, access_token);

  dispatch({
   type: CREATE_BLOGS_BY_USER_ID,
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

export const updateBlog = (blog: BlogInt, token: string) => async (dispatch: Dispatch<AlertTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

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

  const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token);

  dispatch({
   type: ALERT,
   payload: {
    success: res.data.msg
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

export const deleteBlog = (blog: BlogInt, token: string) => async (dispatch: Dispatch<AlertTypeInt | DeleteBlogsUserTypeInt>) => {
 const result = await checkTokenExp(token, dispatch);
 const access_token = result ? result : token;

 try {
  dispatch({
   type: ALERT,
   payload: {
    loading: true
   }
  });

  dispatch({
   type: DELETE_BLOGS_BY_USER_ID,
   payload: blog
  });

  await deleteAPI(`/blog/${blog._id}`, access_token);
  
 } catch (error: any) {
  dispatch({
   type: ALERT,
   payload: {
    errors: error.response.data.msg
   }
  });
 }
}