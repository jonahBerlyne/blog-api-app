import React, { useState } from 'react';
import { replyComment, updateComment } from '../../redux/actions/commentActions';
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

  const [edit, setEdit] = useState<CommentInt>();

  const handleReply = (body: string) => {
    if (!auth.user || !auth.access_token) return;

    const data = {
      user: auth.user,
      blog_id: comment.blog_id,
      blog_user_id: comment.blog_user_id,
      content: body,
      reply_user: comment.user,
      comment_root: comment.comment_root || comment._id,
      createdAt: new Date().toISOString()
    };

    setShowReply([data, ...showReply]);
    dispatch(replyComment(data, auth.access_token));
    setOnReply(false);
  }

  const handleUpdate = (body: string) => {
    if (!auth.user || !auth.access_token || !edit) return;

    if (body === edit.content) {
      return setEdit(undefined);
    }

    const newComment = {
      ...edit,
      content: body
    };
    dispatch(updateComment(newComment, auth.access_token));

    setEdit(undefined);
  }

  const nav = (comment: CommentInt) => {
    return (
      <div>
        <i className='fas fa-trash-alt mx-2' />
        <i className='fas fa-edit me-2' onClick={() => setEdit(comment)} />
      </div>
    );
  }

  return (
    <div className='w-100'>
      {
        edit ?
        <Input 
          callback={handleUpdate} 
          edit={edit}
          setEdit={setEdit}
        /> :
        <div className="comment_box">
          <div className='p-2' dangerouslySetInnerHTML={{
            __html: comment.content
          }} />

          <div className="d-flex justify-content-between p-2">
            <small style={{ cursor: 'pointer' }}onClick={() => setOnReply(!onReply)}>
              {onReply ? 'Cancel' : 'Reply'}
            </small>

            <small className="d-flex">
              <div style={{ cursor: 'pointer' }}>
                {
                  comment.blog_user_id === auth.user?._id ?
                    comment.user._id === auth.user._id ?
                    nav(comment) :
                    <i className='fas fa-trash-alt mx-2' />
                  : comment.user._id === auth.user?._id && nav(comment)
                }
              </div>

              <div>
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </small>
          </div>

        </div>
      }

      {
        onReply && <Input callback={handleReply} />
      }

      <>{props}</>
    </div>
  );
}

export default CommentList;