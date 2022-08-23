import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillProps {
 body: string;
 setBody: (value: string) => void;
}

const LiteQuill: React.FC<QuillProps> = ({ body, setBody }) => {
  const modules = { toolbar: { container }};

  return (
    <div>
     <ReactQuill theme='snow' modules={modules} placeholder='Write something...' value={body} onChange={e => setBody(e)}></ReactQuill>
    </div>
  );
}

let container = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'script': 'sub'}, { 'script': 'super' }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }]                 
];

export default LiteQuill;