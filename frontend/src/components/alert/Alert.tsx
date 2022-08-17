import React from 'react';
import Loading from './Loading';
import { useAppSelector } from '../../redux/hooks';
import { RootStore } from '../../utils/tsDefs';
import Toast from './Toast';

const Alert = () => {
  const { alert } = useAppSelector((state: RootStore) => state);
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.errors && 
        <Toast 
          title="Errors"
          body={alert.errors}
          bgColor="bg-danger"
        />
      }
      {alert.success && 
        <Toast 
          title="Success"
          body={alert.success}
          bgColor="bg-success"
        />
      }
    </div>
  );
}

export default Alert;