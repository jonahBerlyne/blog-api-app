import React from 'react';
import { useParams } from 'react-router-dom';
import { ParamsInt } from './utils/interface';
import NotFound from './components/global/NotFound';

const generatePage = (name: string) => {
 const component = () => require(`./pages/${name}`).default;
 try {
  return React.createElement(component());
 } catch (error) {
  return <NotFound />
 }
}

const PageRender = () => {
  const { page, slug }: ParamsInt = useParams();

  let name = '';

  if (page) {
   name = slug ? `${page}/${slug}` : `${page}`;
  }

  return generatePage(name);
}

export default PageRender;