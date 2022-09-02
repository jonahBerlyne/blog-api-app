import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import { googleLogin } from '../../redux/actions/authAction';

const SocialLogin = () => {

 // Tmrw, get rid of social login

 const dispatch = useAppDispatch();

 const handleGoogleResponse = (googleUser: any) => {
  const id_token = googleUser.getAuthResponse(true).id_token;
  dispatch<any>(googleLogin(id_token));
 }

 const clientConfig = { client_id: `${process.env.REACT_APP_MAIL_CLIENT_ID}` };

 return (
  <>  
   <div className='my-2'>
    <GoogleLoginButton 
     clientConfig={clientConfig}
     responseHandler={handleGoogleResponse}
    />
   </div>
  </>
 );
}

export default SocialLogin;