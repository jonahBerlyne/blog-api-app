import React, { useEffect, useState } from 'react';
import { getOtherInfo } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStore, UserInt } from '../../utils/tsDefs';
import Loading from '../global/Loading';
import NotFound from '../global/NotFound';

interface OtherInfoProp {
  id: string;
}

const OtherInfo: React.FC<OtherInfoProp> = ({ id }) => {
  const [_otherInfo, setOtherInfo] = useState<UserInt>();

  const { otherInfo } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) return;

    if (otherInfo.every(user => user._id !== id)) {
      dispatch(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find(user => user._id === id);
      if (newUser) setOtherInfo(newUser);
    }
  }, [id, dispatch, otherInfo]);

  if (!_otherInfo) return <Loading />;
  return (
    <div className='profile_info text-center rounded'>
      <div className="info_avatar">
        <img src={_otherInfo.avatar} alt="avatar" />
      </div>

      <h5 className="text-uppercase text-danger">
        {_otherInfo.role}
      </h5>

      <div>
        Name: <span className='text-info'>
          {_otherInfo.name}
        </span>
      </div>

      <div>Email/Phone</div>
      <span className='text-info'>
        {_otherInfo.account}
      </span>

      <div>
        Join Date: <span style={{ color: '#ffc107' }}>
          {new Date(_otherInfo.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default OtherInfo;