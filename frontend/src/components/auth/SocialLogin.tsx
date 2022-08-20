import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { googleLogin } from '../../redux/actions/authAction';

const SocialLogin = () => {

 const dispatch = useAppDispatch();

 const onSuccess = (googleUser: GoogleLoginResponse) => {
  const id_token = googleUser.getAuthResponse().id_token;
  dispatch(googleLogin(id_token));
 }

 return (
  <div className='my-2'>
   <GoogleLogin 
    client_id='your-google-client-id'
    cookiepolicy='single_host_origin'
    onSuccess={onSuccess}
   />
  </div>
 );
}

export default SocialLogin;