import React, { useState } from 'react';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import Quill from '../components/editor/ReactQuill';
import NotFound from '../components/global/NotFound';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { BlogInt, RootStore } from '../utils/tsDefs';

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

  const { auth, categories } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

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

     <button className='btn btn-dark mt-3 d-block mx-auto'>
      Create Post
     </button>
    </div>
  );
}

export default CreateBlog;