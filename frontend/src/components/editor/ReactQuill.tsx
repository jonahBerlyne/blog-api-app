import React, { useEffect, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppDispatch } from '../../redux/hooks';
import { ALERT } from '../../redux/types/alertTypes';
import { checkImg, uploadImg } from '../../utils/UploadImg';

interface QuillProp {
 body: string;
 setBody: (value: string) => void;
}

const Quill: React.FC<QuillProp> = ({ body, setBody }) => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>(null);

  const modules = { toolbar: { container }};

  const handleImgChange = useCallback(() => {
   const input = document.createElement('input');
   input.type = 'file';
   input.accept = 'image/*';
   input.click();

   input.onchange = async () => {
    const files = input.files;
    if (!files) return dispatch({
     type: ALERT,
     payload: {
      errors: "File doesn't exist"
     }
    });

    const file = files[0];
    const check = checkImg(file);
    if (check) return dispatch({
     type: ALERT,
     payload: {
      errors: check
     }
    });

    dispatch({
     type: ALERT,
     payload: {
      loading: true
     }
    });

    const photo = await uploadImg(file);
    const quill = quillRef.current;
    const range = quill?.getEditor().getSelection()?.index;

    if (range !== undefined) {
     quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`);
    }

    dispatch({
     type: ALERT,
     payload: {
      loading: false
     }
    });
   } 
  }, [dispatch]);

  useEffect(() => {
   const quill = quillRef.current;
   if (!quill) return;

   let toolbar = quill.getEditor().getModule('toolbar');
   toolbar.addHandler('image', handleImgChange);
  }, [handleImgChange]);

  return (
    <div>
     <ReactQuill theme='snow' modules={modules} placeholder='Write something...' onChange={e => setBody(e)} value={body} ref={quillRef}></ReactQuill>
    </div>
  );
}

let container = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],

  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean', 'link', 'image', 'video']                     
];

export default Quill;