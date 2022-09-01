import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { googleLogin, facebookLogin } from '../../redux/actions/authAction';

const SocialLogin = () => {

 const dispatch = useAppDispatch();

 const onGoogleSuccess = (googleUser: GoogleLoginResponse) => {
  const id_token = googleUser.getAuthResponse().id_token;
  dispatch<any>(googleLogin(id_token));
 }

 const onFacebookSuccess = (response: FacebookLoginAuthResponse) => {
  const { accessToken, userID } = response.authResponse;
  dispatch<any>(facebookLogin(accessToken, userID));
 }

 return (
  <>  
   <div className='my-2'>
    <GoogleLogin 
     client_id={`${process.env.MAIL_CLIENT_ID}`}
     cookiepolicy='single_host_origin'
     onSuccess={onGoogleSuccess}
    />
   </div>

   <div className='my-2'>
    <FacebookLogin 
      appId={`${process.env.FACEBOOK_ID}`}
      onSuccess={onFacebookSuccess}
    />
   </div>
  </>
 );
}

export default SocialLogin;