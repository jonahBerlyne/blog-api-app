import React, { useState } from 'react';
import { resetPassword, updateUser } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FormSubmit, InputChange, RootStore, UserProfileInt } from '../../utils/tsDefs';
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

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (avatar || name) {
      dispatch<any>(updateUser((avatar as File), name, auth));
    }
    if (password && auth.access_token) {
      dispatch<any>(resetPassword(password, confirmPassword, auth.access_token));
    }
  }

  const { name, avatar, password, confirmPassword } = user;

  if (!auth.user) return <NotFound />;

  return (
    <form data-testid='userInfo' className='profile_info' onSubmit={handleSubmit}>
     <div className="info_avatar">
      <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="Avatar" />

      <span>
       <i className="fas fa-camera" />
       <p>Change</p>
       <input data-testid='imgInput' type="file" accept="image/*" name='file' id='file_up' onChange={handleFileChange} />
      </span>
     </div>

     <div className="form-group my-3">
      <label htmlFor="name">Name</label>
      <input data-testid='name' type="text" className='form-control' id="name" name="name" defaultValue={auth.user.name} onChange={handleChange} />
     </div>

     <div className="form-group my-3">
      <label htmlFor="account">Account</label>
      <input data-testid='account' type="text" className='form-control' id="account" name="account" defaultValue={auth.user.account} onChange={handleChange} disabled={true} />
     </div>

     {
      auth.user.type !== 'register' &&
      <small className="text-danger">
        Quick login with {auth.user.type} can't use this function
      </small>
     }

     <div className="form-group my-3">
      <label htmlFor="password">Password</label>
      <div className="password">
       <input data-testid='password' type={showPassword ? 'text' : 'password'} className='form-control' id="password" name="password" value={password} onChange={handleChange} disabled={auth.user.type !== 'register'} />

       <small onClick={() => setShowPassword(!showPassword)}>
        { showPassword ? 'Hide' : 'Show'}
       </small>
      </div>
     </div>

     <div className="form-group my-3">
      <label htmlFor="confirmPassword">Confirm Password</label>
      <div className="password">
       <input data-testid='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} className='form-control' id="password" name="password" value={confirmPassword} onChange={handleChange} disabled={auth.user.type !== 'register'} />

       <small onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        { showConfirmPassword ? 'Hide' : 'Show'}
       </small>
      </div>
     </div>

     <button data-testid='updateBtn' className='btn btn-dark w-100' type="submit">Update</button>
    </form>
  );
}

export default UserInfo;