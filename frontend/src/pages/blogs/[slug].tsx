import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardVert from '../../components/cards/CardVert';
import NotFound from '../../components/global/NotFound';
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

  useEffect(() => {
   if (!categoryID) return;

   if (blogsCategory.every(item => item.id !== categoryID)) {
    dispatch(getBlogsByCategoryID(categoryID));
   } else {
    const data = blogsCategory.find(item => item.id === categoryID);
    if (!data) return;
    setBlogs(data.blogs);
    setTotal(data.total);
   }
  }, [categoryID, blogsCategory, dispatch]);

  if (!blogs) return <NotFound />;

  return (
    <div className="blogs_category">
     <div className="show_blogs">
      {
       blogs.map(blog => (
        <CardVert key={blog._id} blog={blog} />
       ))
      }
     </div>
    </div>
  );
}

export default BlogsByCategory;