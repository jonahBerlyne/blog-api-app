import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { ALERT } from '../../redux/types/alertTypes';

interface ToastProps {
  title: string;
  body: string | string[];
  bgColor: string;
}

const Toast = ({ title, body, bgColor }: ToastProps) => {
  
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch({
      type: ALERT,
      payload: {}
    });
  }

  return (
    <div className={`toast show position-fixed text-light ${bgColor}`} style={{ top: '5px', right: '5px', zIndex: '50', minWidth: '200px' }}>
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto">{title}</strong>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {
          typeof(body) === 'string' ?
          body :
          <ul>
            {body.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Toast;