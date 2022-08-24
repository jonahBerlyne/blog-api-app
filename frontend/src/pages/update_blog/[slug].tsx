import React from 'react';
import { useParams } from 'react-router-dom';
import { ParamsInt } from '../../utils/tsDefs';
import CreateBlog from '../create_blog';

const UpdateBlog = () => {
  const { slug }: ParamsInt = useParams();

  return <CreateBlog id={slug} />;
}

export default UpdateBlog;