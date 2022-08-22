import React from 'react';
import { BlogInt } from '../../utils/tsDefs';

interface DisplayBlogInt {
 blog: BlogInt;
}

const DisplayBlog: React.FC<DisplayBlogInt> = ({ blog }) => {
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
    </div>
  );
}

export default DisplayBlog;