import React, { useEffect, useState } from 'react';
import { CommentInt } from '../../utils/tsDefs';
import AvatarComment from './AvatarComment';
import AvatarReply from './AvatarReply';
import CommentList from './CommentList';

interface CommentsProp {
  comment: CommentInt;
}

const Comments: React.FC<CommentsProp> = ({ comment }) => {
  const [showReply, setShowReply] = useState<CommentInt[]>([]);
  const [next, setNext] = useState<number>(2);

  useEffect(() => {
    if (!comment.reply_comment) return;
    setShowReply(comment.reply_comment);
  }, [comment.reply_comment]);

  return (
    <div className='my-3 d-flex' style={{
      opacity: comment._id ? 1 : 0.5,
      pointerEvents: comment._id ? 'initial' : 'none'
    }}>
      <AvatarComment user={comment.user} />
      <CommentList 
        comment={comment} 
        showReply={showReply}
        setShowReply={setShowReply}
      />
      {
        showReply.slice(0, next).map((comment, index) => (
          <div key={index} style={{
            opacity: comment._id ? 1 : 0.5,
            pointerEvents: comment._id ? 'initial' : 'none'
          }}>
            <AvatarReply 
              user={comment.user}
              reply_user={comment.reply_user}
            />
            <CommentList 
              comment={comment} 
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
        ))
      }

      <div style={{ cursor: 'pointer' }}>
        {
          showReply.length - next > 0 ?
          <small style={{ color: 'crimson' }} onClick={() => setNext(next + 5)}>
            See more comments...
          </small> :
          showReply.length > 2 &&
          <small style={{ color: 'teal' }} onClick={() => setNext(2)}>
            Hide comments
          </small>
        }
      </div>
    </div>
  );
}

export default Comments;