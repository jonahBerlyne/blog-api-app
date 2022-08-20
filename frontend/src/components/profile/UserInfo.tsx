import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { InputChange, RootStore, UserProfileInt } from '../../utils/tsDefs';
import NotFound from '../global/NotFound';

const UserInfo = () => {
  const initialState = {
   name: '',
   account: '',
   avatar: '',
   password: '',
   confirmPassword: ''
  };

  const { auth } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<UserProfileInt>(initialState);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleChange = (e: InputChange) => {
   setUser({
    ...user,
    [e.target.name]: e.target.value 
   });
  }

  const handleFileChange = (e: InputChange) => {
   const target = e.target as HTMLInputElement;
   const files = target.files;

   if (files) {
    const file = files[0];
    setUser({
     ...user,
     avatar: file
    });
   }
  }

  const { name, avatar, password, confirmPassword } = user;

  if (!auth.user) return <NotFound />;

  return (
    <form className='profile_info'>
     <div className="info_avatar">
      <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="Avatar" />

      <span>
       <i className="fas fa-camera" />
       <p>Change</p>
       <input type="file" accept="image/*" name='file' id='file_up' onChange={handleFileChange} />
      </span>
     </div>

     <div className="form-group my-3">
      <label htmlFor="name">Name</label>
      <input type="text" className='form-control' id="name" name="name" defaultValue={auth.user.name} onChange={handleChange} />
     </div>

     <div className="form-group my-3">
      <label htmlFor="account">Account</label>
      <input type="text" className='form-control' id="account" name="account" defaultValue={auth.user.account} onChange={handleChange} disabled={true} />
     </div>

     <div className="form-group my-3">
      <label htmlFor="password">Password</label>
      <div className="password">
       <input type={showPassword ? 'text' : 'password'} className='form-control' id="password" name="password" value={password} onChange={handleChange} />

       <small onClick={() => setShowPassword(!showPassword)}>
        { showPassword ? 'Hide' : 'Show'}
       </small>
      </div>
     </div>

     <div className="form-group my-3">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <div className="password">
       <input type={showConfirmPassword ? 'text' : 'password'} className='form-control' id="password" name="password" value={confirmPassword} onChange={handleChange} />

       <small onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        { showConfirmPassword ? 'Hide' : 'Show'}
       </small>
      </div>
     </div>

     <button className='btn btn-dark w-100' type="submit">Update</button>
    </form>
  );
}

export default UserInfo;