import React, { useEffect, useRef, useState } from 'react';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import Quill from '../components/editor/ReactQuill';
import NotFound from '../components/global/NotFound';
import { createBlog } from '../redux/actions/blogActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { ALERT } from '../redux/types/alertTypes';
import { BlogInt, RootStore } from '../utils/tsDefs';
import { uploadImg } from '../utils/UploadImg';
import { validCreateBlog } from '../utils/Validator';

const CreateBlog = () => {
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

    dispatch(createBlog(newData, auth.access_token));
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

     <Quill setBody={setBody} />

     <div ref={divRef} dangerouslySetInnerHTML={{
      __html: body
     }} style={{ display: 'none' }} />
     <small>
      {text.length}
     </small>

     <button className='btn btn-dark mt-3 d-block mx-auto' onClick={handleSubmit}>
      Create Post
     </button>
    </div>
  );
}

export default CreateBlog;