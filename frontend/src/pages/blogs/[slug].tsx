import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import CardVert from '../../components/cards/CardVert';
import Loading from '../../components/global/Loading';
import NotFound from '../../components/global/NotFound';
import Pagination from '../../components/global/Pagination';
import { getBlogsByCategoryID } from '../../redux/actions/blogActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BlogInt, ParamsInt, RootStore } from '../../utils/tsDefs';

const BlogsByCategory = () => {
  const { categories, blogsCategory } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  const { slug }: ParamsInt = useParams();
  
  const [categoryID, setCategoryID] = useState<string>('');
  const [blogs, setBlogs] = useState<BlogInt[]>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
   const category = categories.find(item => item.name === slug);
   if (category) setCategoryID(category._id);
  }, [slug, categories]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    if (!categoryID) return;

   if (blogsCategory.every(item => item.id !== categoryID)) {
    dispatch<any>(getBlogsByCategoryID(categoryID, search));
   } else {
    const data = blogsCategory.find(item => item.id === categoryID);
    if (!data) return;
    setBlogs(data.blogs);
    setTotal(data.total);
    if (data.search) navigate(data.search);
   }
  }, [categoryID, blogsCategory, dispatch, search]);


  const handlePagination = (num: number) => {
    const search = `?page=${num}`;
    dispatch<any>(getBlogsByCategoryID(categoryID, search));
  }

  if (!blogs) return <Loading />;

  return (
    <div className="blogs_category">
     <div className="show_blogs">
      {
       blogs.map(blog => (
        <CardVert key={blog._id} blog={blog} />
       ))
      }
     </div>
     {
      total > 1 &&
      <Pagination 
        total={total}
        callback={handlePagination}
      />
     }
    </div>
  );
}

export default BlogsByCategory;