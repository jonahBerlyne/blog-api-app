import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/userActions';
import { useAppDispatch } from '../../redux/hooks';
import { FormSubmit, ParamsInt } from '../../utils/tsDefs';

const ResetPassword = () => {
  const { slug: token }: ParamsInt = useParams();
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormSubmit) => {
   e.preventDefault();
   if (token) dispatch<any>(resetPassword(password, confirmPassword, token));
  }

  return (
    <div className='auth_page'>
     <form className='auth_box' onSubmit={handleSubmit}>
      <h3 className='text-uppercase text-center mb-4'>Reset Password</h3>
      <div className="form-group my-2">
       <label htmlFor="password" className="form-label">Password</label>
       <div className="password_input">
        <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

        <small onClick={() => setShowPassword(!showPassword)}>
         {showPassword ? "Hide" : "Show"}
        </small>
       </div>
      </div>

      <div className="form-group my-2">
       <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
       <div className="password_input">
        <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="password" name="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

        <small onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
         {showConfirmPassword ? "Hide" : "Show"}
        </small>
       </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 mt-2">
       Register
      </button>
     </form>
    </div>
  );
}

export default ResetPassword;