import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { BlogInt, InputChange, RootStore } from '../../utils/tsDefs';

interface BlogFormProps {
 blog: BlogInt;
 setBlog: (blog: BlogInt) => void
}

const CreateForm: React.FC<BlogFormProps> = ({ blog, setBlog }) => {
  const { categories } = useAppSelector((state: RootStore) => state);

  const handleChange = (e: InputChange) => {
   setBlog({
    ...blog,
    [e.target.name]: e.target.value
   });
  }
  
  const handleFileChange = (e: InputChange) => {
   const target = e.target as HTMLInputElement;
   const files = target.files;

   if (files) {
    const file = files[0];
    setBlog({
     ...blog,
     thumbnail: file
    });
   }
  }

  return (
    <form>
     <div className="form-group position-relative">
      <input type="text" className='form-control' value={blog.title} name="title" onChange={handleChange} />
      <small className="text-muted position-absolute" style={{ bottom: 0, right: '3px', opacity: '0.3' }}>
       {blog.title.length}/50
      </small>
     </div>

     <div className="form-group my-3">
      <input type="file" className='form-control' accept="image/*" onChange={handleFileChange} />
     </div>

     <div className="form-group position-relative">
      <textarea rows={4} className='form-control' value={blog.description} style={{ resize: 'none'}} name='description' onChange={handleChange} />
      <small className="text-muted position-absolute" style={{ bottom: 0, right: '3px', opacity: '0.3' }}>
       {blog.description.length}/200
      </small>
     </div>

     <div className="form-group my-3">
      <select className='form-control text-capitalize' name='category' value={blog.category} onChange={handleChange}>
       <option value="">Choose a category</option>
       {
        categories.map(category => (
         <option key={category._id} value={category._id}>{category.name}</option>
        ))
       }
      </select>
     </div>
    </form>
  );
}

export default CreateForm;