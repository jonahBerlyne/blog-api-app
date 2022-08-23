import React from 'react';
import { CommentInt } from '../../utils/tsDefs';
import AvatarComment from './AvatarComment';
import CommentList from './CommentList';

interface CommentsProp {
  comment: CommentInt;
}

const Comments: React.FC<CommentsProp> = ({ comment }) => {
  return (
    <div className='my-3 d-flex' style={{
      opacity: comment._id ? 1 : 0.5,
      pointerEvents: comment._id ? 'initial' : 'none'
    }}>
      <AvatarComment user={comment.user} />
      <CommentList comment={comment} />
    </div>
  );
}

export default Comments;