import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createComment, getComments } from '../../redux/actions/commentActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BlogInt, CommentInt, RootStore, UserInt } from '../../utils/tsDefs';
import Comments from '../comments/Comments';
import Input from '../comments/Input';
import Loading from '../global/Loading';

interface DisplayBlogInt {
 blog: BlogInt;
}

const DisplayBlog: React.FC<DisplayBlogInt> = ({ blog }) => {

  const { auth, comments } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  const [showComments, setShowComments] = useState<CommentInt[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleComment = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      content: body,
      user: auth.user,
      blog_id: (blog._id as string),
      blog_user_id: (blog.user as UserInt)._id,
      createdAt: new Date().toISOString()
    };

    setShowComments([...showComments, data]);
    dispatch(createComment(data, auth.access_token));
  }

  useEffect(() => {
    setShowComments(comments.data);
  }, [comments.data]);

  const fetchComments = useCallback(async (id: string) => {
    setLoading(true);
    await dispatch(getComments(id));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (!blog._id) return;
    fetchComments(blog._id);
  }, [blog._id, fetchComments]);

  return (
    <div>
     <h2 className='text-center my-3 text-capitalize fs-1' style={{ color: "#ff7a00" }}>
      {blog.title}
     </h2>

     <div className='text-end fst-italic' style={{ color: 'teal' }}>
      <small>
       {
        typeof(blog.user) !== "string" &&
        `By: ${blog.user.name}`
       }
      </small>

      <small className='ms-2'>
       {new Date(blog.createdAt).toLocaleString()}
      </small>
     </div>

     <div dangerouslySetInnerHTML={{
      __html: blog.content
     }} />

     <hr className='my-1' />
     <h3 style={{ color: '#ff7a00' }}>Comments</h3>

     {
      auth.user ?
      <Input callback={handleComment} /> :
      <h5>Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment</h5>
     }

     {
      loading ?
      <Loading /> :
      showComments?.map((comment, index) => (
        <Comments key={index} comment={comment} />
      ))
     }

    </div>
  );
}

export default DisplayBlog;