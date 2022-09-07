import React, { useState } from 'react';
import { FormSubmit } from '../../utils/tsDefs';
import { useAppDispatch } from '../../redux/hooks';
import { loginSMS } from '../../redux/actions/authAction';

const LoginSMS = () => {
  const [phone, setPhone] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    dispatch<any>(loginSMS(phone));
  }

  return (
    <form data-testid="smsLoginForm" onSubmit={handleSubmit}>
     <div className="form-group mb-3">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input data-testid="phone" type="text" className='form-control' id='phone' value={phone} onChange={e => setPhone(e.target.value)} placeholder='+0123456789' />
     </div>
     <button data-testid="smsLoginBtn" className="btn btn-dark w-100" type="submit" disabled={phone === '' ? true : false}>Login</button>
    </form>
  );
}

export default LoginSMS;