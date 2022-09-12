import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import BlogsPage from "../[slug]";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';

describe("Blogs Page", () => {
 const navigate = jest.fn();

 const useLocation = jest.spyOn(ReactRouter, 'useLocation');
 const useNavigate = jest.spyOn(ReactRouter, 'useNavigate');
 const useParams = jest.spyOn(ReactRouter, 'useParams');
    
 beforeEach(() => {
  useLocation.mockReturnValue({ search: '?testQueryParameters' } as any);
  useNavigate.mockReturnValue(navigate);
  useParams.mockReturnValue({
   slug: 'example'
  });
 });

 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = () => {  
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
   categories: [
    {
     name: 'example',
     createdAt: '000000',
     updatedAt: '000001',
     _id: '0',
    }
   ],
   blogsCategory: [
    {
     id: '0',
     blogs: [
      {
        _id: '0',
        user: {
          account: 'example@example.com',
          password: 'examplePassword',
          avatar: 'userExample.png',
          createdAt: '000000',
          name: 'exampleName',
          role: 'user',
          type: 'user',
          updatedAt: '000001',
          _id: '0'
        },
        title: 'titleExample',
        content: 'contentExample',
        description: 'descriptionExample',
        thumbnail: 'thumbnailExample.png',
        category: 'example',
        createdAt: '000000'
      }
     ],
     total: 1,
     search: 'searchExample'
    }
   ]
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <BlogsPage />
    </Router>
   </Provider>
  );

  return {
   container
  };
 }

 it("renders the blogs page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("displays the blog card", () => {
  setup();

  expect(screen.getByTestId('blogThumbnail').getAttribute('src')).toEqual('thumbnailExample.png');
  expect(screen.getByTestId('blogTitle').innerHTML).toEqual('titleExample...');
  expect(screen.getByTestId('blogDescription').innerHTML).toEqual('descriptionExample...');
  expect(screen.getByTestId('blogUserName').innerHTML).toEqual('By: exampleName');
 }); 
});