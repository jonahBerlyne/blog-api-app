import React, { useEffect, useRef, useState } from 'react';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import Quill from '../components/editor/ReactQuill';
import NotFound from '../components/global/NotFound';
import { createBlog, updateBlog } from '../redux/actions/blogActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ALERT } from '../redux/types/alertTypes';
import { getAPI } from '../utils/FetchData';
import { BlogInt, RootStore, UserInt } from '../utils/tsDefs';
import { uploadImg } from '../utils/UploadImg';
import { validCreateBlog, shallowEqual } from '../utils/Validator';

interface CreateProp {
  id?: string;
}

const CreateBlog: React.FC<CreateProp> = ({ id }) => {
  const initialState = {
   user: '',
   title: '',
   content: '',
   description: '',
   thumbnail: '',
   category: '',
   createdAt: new Date().toISOString()
  };

  const [blog, setBlog] = useState<BlogInt>(initialState);
  const [body, setBody] = useState<string>('');

  const divRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');

  const { auth } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  const [oldData, setOldData] = useState<BlogInt>(initialState);

  useEffect(() => {
    if (!id) return;

    getAPI(`blog/${id}`)
    .then(res => {
      setBlog(res.data);
      setBody(res.data.content);
      setOldData(res.data);
    })
    .catch(err => console.log(err));

    return () => {
      setBlog(initialState);
      setBody('');
      setOldData(initialState);
    }
  }, [id]);

  useEffect(() => {
   const div = divRef.current;
   if (!div) return;
   const text = (div?.innerText as string);
   setText(text);
  }, [body]);

  const handleSubmit = async () => {
    if (!auth.access_token) return;

    const check = validCreateBlog({ 
      ...blog,
      content: text
    });

    if (check.errLength > 0) {
      return dispatch({
        type: ALERT,
        payload: {
          errors: check.errMsg
        }
      });
    }

    let newData = {
      ...blog,
      content: body
    };

    if (id) {
      if ((blog.user as UserInt)._id !== auth.user?._id) return dispatch({
        type: ALERT,
        payload: {
          errors: "Invalid Authentication"
        }
      });

      const result = shallowEqual(oldData, newData);
      if (result) return dispatch({
        type: ALERT,
        payload: {
          errors: "The data is the same"
        }
      });
      
      dispatch(updateBlog(newData, auth.access_token));
    } else {
      dispatch(createBlog(newData, auth.access_token));
    }
  }

  if (!auth.access_token) return <NotFound />;
  return (
    <div className='my-4 create_blog'>
     <div className="row mt-4">
      <div className="col md-6">
       <h5>Create</h5>
       <CreateForm blog={blog} setBlog={setBlog} />
      </div>

      <div className="col md-6">
       <h5>Preview</h5>
       <CardHoriz blog={blog} />
      </div>
     </div>

     <Quill setBody={setBody} body={body} />

     <div ref={divRef} dangerouslySetInnerHTML={{
      __html: body
     }} style={{ display: 'none' }} />
     <small>
      {text.length}
     </small>

     <button className='btn btn-dark mt-3 d-block mx-auto' onClick={handleSubmit}>
      { id ? 'Update Post' : 'Create Post' }
     </button>
    </div>
  );
}

export default CreateBlog;