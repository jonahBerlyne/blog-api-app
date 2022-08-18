import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from '../../components/alert/Alert';
import { postAPI } from '../../utils/FetchData';
import { ParamsInt } from '../../utils/tsDefs';

const AccountActivation = () => {
  const { slug }: ParamsInt = useParams();

  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
   if (slug) {
    postAPI('activate', { active_token: slug })
    .then(res => setSuccess(res.data.msg))
    .catch(err => setErr(err.response.data.msg));
   }
  }, [slug]);
  
  return (
    <div>
      {err !== '' && showErrMsg(err)}
      {success !== '' && showSuccessMsg(success)}
    </div>
  );
}

export default AccountActivation;