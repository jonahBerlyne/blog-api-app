import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBlogsByUserID } from '../../redux/actions/blogActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BlogInt, ParamsInt, RootStore } from '../../utils/tsDefs';
import CardHoriz from '../cards/CardHoriz';
import Loading from '../global/Loading';
import Pagination from '../global/Pagination';

const UserBlogs = () => {
  const {blogsUser} = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();
  const { slug: user_id }: ParamsInt = useParams();

  const [blogs, setBlogs] = useState<BlogInt[]>();
  const [total, setTotal] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { search } = location;

  useEffect(() => {
    if (!user_id) return;

    if (blogsUser.every(item => item.id !== user_id)) {
      dispatch(getBlogsByUserID(user_id, search));
    } else {
      const data = blogsUser.find(item => item.id === user_id);
      if (!data) return;

      setBlogs(data.blogs);
      setTotal(data.total);
      if (data.search) navigate(data.search);
    }
  }, [user_id, dispatch, blogsUser, navigate, search]);

  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUserID(`${user_id}`, search));
  }

  if (!blogs) return <Loading />;

  if (blogs.length === 0 && total < 1) return (
    <h3 className='text-center'>No Blogs</h3>
  );

  return (
    <div>
      <div>
        {
          blogs.map(blog => (
            <CardHoriz key={blog._id} blog={blog} />
          ))
        }
      </div>
      <div>
        <Pagination 
          total={total}
          callback={handlePagination}
        />
      </div>
    </div>
  );
}

export default UserBlogs;