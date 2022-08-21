import React, { useState } from 'react';
import NotFound from '../components/global/NotFound';
import { createCategory } from '../redux/actions/categoryActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { FormSubmit, RootStore } from '../utils/tsDefs';

const Category = () => {
  const [name, setName] = useState<string>('');

  const { auth, categories } = useAppSelector((state: RootStore) => state);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!auth.access_token || !name) return;
    dispatch(createCategory(name, auth.access_token));
    setName('');
  }

  if (auth.user?.role !== 'admin') return <NotFound />;

  return (
    <div className='category row'>
     <form onSubmit={handleSubmit}>
      <label htmlFor='category'>Category</label>
      <div className="d-flex">
       <input type='text' name='category' id='category' value={name} onChange={e => setName(e.target.value)} />
       <button type="submit">Create</button>
      </div>
     </form>

     <div>
      {
        categories.map(category => (
          <div className="category_row" key={category._id}>
            <p className='m-0 text-capitalize'>{category.name}</p>

            <div>
              <i className='fas fa-edit mx-2' />
              <i className='fas fa-trash-alt' />
            </div>
          </div>
        ));
      }
      
     </div>
    </div>
  );
}

export default Category;