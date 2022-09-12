import React from 'react';
import { Link } from 'react-router-dom';
import { BlogInt } from '../../utils/tsDefs';

interface CardVertProp {
 blog: BlogInt;
}

const CardVert: React.FC<CardVertProp> = ({ blog }) => {
  return (
    <div className="card">
     {
      typeof(blog.thumbnail) === 'string' &&
      <img data-testid='blogThumbnail' src={blog.thumbnail} className="card-img-top" alt="blog thumbnail" style={{ height: '180px', objectFit: 'cover' }} />
     }

     <div className="card-body">
       <h5 className="card-title">
        <Link data-testid='blogTitle' to={`/blog/${blog._id}`} style={{ textDecoration: 'none', textTransform: "capitalize" }}>
         {blog.title.slice(0,50) + '...'}
        </Link>
       </h5>
       <p data-testid='blogDescription' className="card-text">
        {blog.description.slice(0,100) + '...'}
       </p>
       <p className="card-text d-flex justify-content-between">
        <small className='text-muted text-capitalize'>
         {typeof(blog.user) !== 'string' &&
          <Link data-testid='blogUserName' to={`/profile/${blog.user._id}`} style={{ textDecoration: 'none', textTransform: "capitalize" }}>By: {blog.user.name}</Link>
         }
        </small>

        <small className='text-muted'>
         {new Date(blog.createdAt).toLocaleString()}
        </small>
       </p>
     </div>
   </div>
  );
}

export default CardVert;