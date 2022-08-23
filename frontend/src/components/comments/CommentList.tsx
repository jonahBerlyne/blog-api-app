import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CommentInt, RootStore } from '../../utils/tsDefs';
import Input from './Input';

interface CommentProps {
  comment: CommentInt;
  showReply: CommentInt[];
  setShowReply: (showReply: CommentInt[]) => void;
}

const CommentList: React.FC<CommentProps> = ({ comment, showReply, setShowReply }) => {
  const props = {
    comment,
    showReply,
    setShowReply
  };
  const { auth } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  const [onReply, setOnReply] = useState<boolean>(false);

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment._id,
      createdAt: new Date().toISOString()
    };

    setShowReply([...showReply, data]);
    setOnReply(false);
  }

  return (
    <div className='w-100'>
      <div className="comment_box">
        <div className='p-2' dangerouslySetInnerHTML={{
          __html: comment.content
        }} />

        <div className="d-flex justify-content-between p-2">
          <small style={{ cursor: 'pointer' }}onClick={() => setOnReply(!onReply)}>
            {onReply ? 'Cancel' : 'Reply'}
          </small>
          <small>
            {new Date(comment.createdAt).toLocaleString()}
          </small>
        </div>

      </div>

      {
        onReply && <Input callback={handleReply} />
      }

      <>{props}</>
    </div>
  );
}

export default CommentList;