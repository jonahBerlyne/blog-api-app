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
        showReply.map((comment, index) => (
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
    </div>
  );
}

export default Comments;