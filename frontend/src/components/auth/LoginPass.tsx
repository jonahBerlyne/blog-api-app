import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { InputChange, FormSubmit, UserLoginInt } from '../../utils/tsDefs';
import { login } from '../../redux/actions/authAction';

const LoginPass = () => {
  const initialState = {
   account: '',
   password: ''
  };

  const [userLogin, setUserLogin] = useState<any>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { account, password } = userLogin;

  const handleChange = (e: InputChange): void => setUserLogin({
   ...userLogin,
   [e.target.name]: e.target.value
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormSubmit): void => {
    e.preventDefault();
    dispatch<any>(login(userLogin));
  }

  return (
    <form data-testid="regLoginForm" onSubmit={handleSubmit}>
     <div className="form-group mb-3">
      <label htmlFor="account" className="form-label">Email/Phone</label>
      <input data-testid="account" type="text" className="form-control" id="account" name="account" value={account} onChange={handleChange} />
     </div>

     <div className="form-group mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <div className="password_input">
       <input data-testid="password" type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={password} onChange={handleChange} />

       <small onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
       </small>
      </div>
     </div>

     <button data-testid="loginBtn" className="btn btn-dark w-100 mt-1" type='submit' disabled={(account && password) ? false : true}>Login</button>
    </form>
  );
}

export default LoginPass;