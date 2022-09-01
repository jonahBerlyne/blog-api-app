import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { InputChange, FormSubmit } from '../../utils/tsDefs';
import { register } from '../../redux/actions/authAction';

const RegisterForm = () => {
  const initialState = {
   name: '',
   account: '',
   password: '',
   confirmPassword: ''
  };

  const [userRegister, setUserRegister] = useState<any>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { name, account, password, confirmPassword } = userRegister;

  const handleChange = (e: InputChange): void => setUserRegister({
   ...userRegister,
   [e.target.name]: e.target.value
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormSubmit): void => {
    e.preventDefault();
    dispatch<any>(register(userRegister));
  }

  return (
    <form onSubmit={handleSubmit}>

     <div className="form-group mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleChange} />
     </div>

     <div className="form-group mb-3">
      <label htmlFor="account" className="form-label">Email/Phone</label>
      <input type="text" className="form-control" id="account" name="account" value={account} onChange={handleChange} />
     </div>

     <div className="form-group mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <div className="password_input">
       <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={password} onChange={handleChange} />

       <small onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
       </small>
      </div>
     </div>

     <div className="form-group mb-3">
      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
      <div className="password_input">
       <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} />

       <small onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
        {showConfirmPassword ? "Hide" : "Show"}
       </small>
      </div>
     </div>

     <button className="btn btn-dark w-100 my-1" type='submit' disabled={(account && password) ? false : true}>Login</button>
    </form>
  );
}

export default RegisterForm;