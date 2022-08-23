import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrMsg } from '../../components/alert/Alert';
import DisplayBlog from '../../components/blog/DisplayBlog';
import Loading from '../../components/global/Loading';
import { getAPI } from '../../utils/FetchData';
import { BlogInt, ParamsInt } from '../../utils/tsDefs';

const BlogDetail = () => {
  const { slug: id }: ParamsInt = useParams();
  
  const [blog, setBlog] = useState<BlogInt>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
   if (!id) return;
   setLoading(true);

   getAPI(`blog/${id}`)
   .then(res => {
    setBlog(res.data);
    setLoading(false);
   })
   .catch(err => {
    setError(err.response.data.msg);
    setLoading(false);
   });

   return () => {
    setBlog(undefined);
   }
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className='my-4'>
     {error && showErrMsg(error)}
     {blog && <DisplayBlog blog={blog} />}
     
     <h2>Comments</h2>
    </div>
  );
}

export default BlogDetail;