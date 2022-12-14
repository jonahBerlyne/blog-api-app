import React from 'react';
import { useParams } from 'react-router-dom';
import { ParamsInt } from './utils/tsDefs';
import NotFound from './components/global/NotFound';

const generatePage = (name: string) => {
 const component = (): NodeRequire => {
  if (name === '') return require('./pages/index').default;
  return require(`./pages/${name}`).default;
 }

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