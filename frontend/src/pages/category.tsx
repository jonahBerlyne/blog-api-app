import React, { useEffect, useState } from 'react';
import NotFound from '../components/global/NotFound';
import { createCategory, deleteCategory, updateCategory } from '../redux/actions/categoryActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { CategoryInt, FormSubmit, RootStore } from '../utils/tsDefs';

const Category = () => {
  const [name, setName] = useState<string>('');
  const [edit, setEdit] = useState<CategoryInt | null>(null);

  const { auth, categories } = useAppSelector((state: RootStore) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, auth.access_token));
    } else {
      dispatch(createCategory(name, auth.access_token));
    }

    setName('');
    setEdit(null);
  }

  const handleDelete = (id: string) => {
    if (!auth.access_token) return;
    
    if (window.confirm('Are you sure you want to delete this category?')) dispatch(deleteCategory(id, auth.access_token));
  }

  if (auth.user?.role !== 'admin') return <NotFound />;

  return (
    <div className='category row'>
     <form onSubmit={handleSubmit}>
      <label htmlFor='category'>Category</label>
      <div className="d-flex align-items-center">
       {
         edit && <i className='fas fa-times me-2 text-danger' style={{ cursor: 'pointer' }} onClick={() => setEdit(null)} />
       }
       <input type='text' name='category' id='category' value={name} onChange={e => setName(e.target.value)} />
       <button type="submit">
        { edit ? 'Update' : 'Create' }
       </button>
      </div>
     </form>

     <div>
      {
        categories.map(category => (
          <div className="category_row" key={category._id}>
            <p className='m-0 text-capitalize'>{category.name}</p>

            <div>
              <i className='fas fa-edit mx-2' onClick={() => setEdit(category)} />
              <i className='fas fa-trash-alt' onClick={() => handleDelete(category._id)} />
            </div>
          </div>
        ))
      }
      
     </div>
    </div>
  );
}

export default Category;