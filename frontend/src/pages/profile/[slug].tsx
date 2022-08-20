import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { ParamsInt, RootStore } from '../../utils/tsDefs';
import UserInfo from '../../components/profile/UserInfo';
import OtherInfo from '../../components/profile/OtherInfo';
import UserBlogs from '../../components/profile/UserBlogs';

const Profile = () => {
  const { slug }: ParamsInt = useParams();
  const { auth } = useAppSelector((state: RootStore) => state);

  return (
    <div className='row my-3'>
     <div className="col-md-5 mb-3">
      {
       auth.user?._id === slug ?
       <UserInfo /> :
       <OtherInfo />
      }
     </div>

     <div className="col-md-7">
      <UserBlogs />
     </div>
    </div>
  );
}

export default Profile;