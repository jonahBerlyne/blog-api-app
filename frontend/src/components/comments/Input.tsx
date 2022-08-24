import React, { useRef, useState, useEffect } from 'react';
import { CommentInt } from '../../utils/tsDefs';
import LiteQuill from '../editor/LiteQuill';

interface InputProps {
 callback: (body: string) => void;
 edit?: CommentInt;
 setEdit?: (edit?: CommentInt) => void;
}

const Input: React.FC<InputProps> = ({ callback, edit, setEdit }) => {
  const [body, setBody] = useState<string>('');
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (edit) setBody(edit.content);
  }, [edit]);

  const handleSubmit = () => {
   const div = divRef.current;
   const text = (div?.innerText as string)

   if (!text.trim()) {
    if (setEdit) return setEdit(undefined);
    return;
   };

   callback(body);
   setBody('');
  }

  return (
    <div>
     <LiteQuill body={body} setBody={setBody} />

     <div ref={divRef} dangerouslySetInnerHTML={{
      __html: body
     }} style={{ display: 'none' }} />

     <button className='btn btn-dark ms-auto d-block px-4 mt-2' onClick={handleSubmit}>{edit ? 'Update' : 'Send'}</button>
    </div>
  );
}

export default Input;