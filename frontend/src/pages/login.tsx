import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import { useAppSelector } from '../redux/hooks';
import { RootStore } from '../utils/tsDefs';

const LoginPage = () => {
  const [sms, setSms] = useState<boolean>(false);

  const navigate = useNavigate();

  const { auth } = useAppSelector((state: RootStore) => state);

  useEffect(() => {
    if (auth.access_token) navigate('/');
  }, [auth.access_token, navigate]);

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className='text-uppercase text-center mb-4'>Login</h3>
        {sms ? <LoginSMS /> : <LoginPass />}
        <small className="row my-2 text-primary" style={{ cursor: 'pointer' }}>
          <span className="col-6">
            <Link to="/forgot_password" className='col-6'>Forgot Password?</Link>
          </span>
          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            Sign in with {sms ? "password" : "SMS"}
          </span>
        </small>
        <p>
          You don't have an account?
          <Link to="/register" style={{ color: "crimson" }}>Click Here to Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;