import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { CREATE_COMMENT, DELETE_COMMENT, DELETE_REPLY, REPLY_COMMENT, UPDATE_COMMENT, UPDATE_REPLY } from './redux/types/commentTypes';
import { CommentInt, RootStore } from './utils/tsDefs';

const SocketClient = () => {
  const { socket } = useAppSelector((state: RootStore) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
   if (!socket) return;
   socket.on('createComment', (data: CommentInt) => {
    dispatch({
     type: CREATE_COMMENT,
     payload: data
    });
   });

   return () => {
    socket.off('createComment');
   }
  }, [socket, dispatch]);

  useEffect(() => {
   if (!socket) return;
   socket.on('replyComment', (data: CommentInt) => {
    dispatch({
     type: REPLY_COMMENT,
     payload: data
    });
   });

   return () => {
    socket.off('replyComment');
   }
  }, [socket, dispatch]);

  useEffect(() => {
   if (!socket) return;
   socket.on('updateComment', (data: CommentInt) => {
    dispatch({
     type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
     payload: data
    });
   });

   return () => {
    socket.off('updateComment');
   }
  }, [socket, dispatch]);

  useEffect(() => {
   if (!socket) return;
   socket.on('deleteComment', (data: CommentInt) => {
    dispatch({
     type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
     payload: data
    });
   });

   return () => {
    socket.off('deleteComment');
   }
  }, [socket, dispatch]);

  return <div />;
}

export default SocketClient;