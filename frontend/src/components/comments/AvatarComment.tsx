import React from 'react';
import { Link } from 'react-router-dom';
import { UserInt } from '../../utils/tsDefs';

interface AvatarProps {
 user: UserInt;
}

const AvatarComment: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className='avatar_comment'>
     <img data-testid='userAvatar' src={user.avatar} alt="avatar" />

     <small data-testid='userName' className="d-block text-break">
      <Link to={`/profile/${user._id}`}>
       {user.name}
      </Link>
     </small>
    </div>
  );
}

export default AvatarComment;