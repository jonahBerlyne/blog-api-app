import React, { useState } from 'react';
import { forgotPassword } from '../../redux/actions/authAction';
import { useAppDispatch } from '../../redux/hooks';
import { FormSubmit } from '../../utils/tsDefs';

const ForgotPassword = () => {
  const [account, setAccount] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormSubmit) => {
   e.preventDefault();
   dispatch<any>(forgotPassword(account));
  }

  return (
    <div className='my-4' style={{ maxWidth: '500px' }}>
     <h2>Forgot Password?</h2>

     <form className="form-group" onSubmit={handleSubmit}>
      <label htmlFor='account'>Email/Phone</label>

      <div className="d-flex align-items-center">
       <input data-testid='account' type="text" id="account" className='form-control' name='account' onChange={e => setAccount(e.target.value)} />

       <button data-testid='sendBtn' className='btn btn-primary mx-2 d-flex align-items-center' type="submit">
        <i className='fas fa-paper-plane me-2' /> Send
       </button>
      </div>
     </form>

    </div>
  );
}

export default ForgotPassword;