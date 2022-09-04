import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  const location = useLocation();

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className='text-uppercase text-center mb-4'>Register</h3>
        <RegisterForm />
        <p className='mt-2'>
          Already have an account?
          <Link to={`/login${location.search}`} style={{ color: "crimson" }}>Click Here to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;