import React, { useEffect, useState } from 'react';
import { getOtherInfo } from '../../redux/actions/userActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStore, UserInt } from '../../utils/tsDefs';
import Loading from '../global/Loading';

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
      dispatch<any>(getOtherInfo(id));
    } else {
      const newUser = otherInfo.find(user => user._id === id);
      if (newUser) setOtherInfo(newUser);
    }
  }, [id, dispatch, otherInfo]);

  if (!_otherInfo) return <Loading />;

  return (
    <div data-testid='otherInfo' className='profile_info text-center rounded'>
      <div className="info_avatar">
        <img data-testid='avatar' src={_otherInfo.avatar} alt="avatar" />
      </div>

      <h5 data-testid='role' className="text-uppercase text-danger">
        {_otherInfo.role}
      </h5>

      <div data-testid='name'>
        Name: <span className='text-info'>
          {_otherInfo.name}
        </span>
      </div>

      <div>Email/Phone</div>
      <span data-testid='account' className='text-info'>
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