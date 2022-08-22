import { Dispatch } from "redux";
import { BlogInt } from "../../utils/tsDefs";
import { uploadImg } from "../../utils/UploadImg";
import { ALERT, AlertTypeInt } from "../types/alertTypes";

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