import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import * as ReduxHooks from "../../../redux/hooks";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import CreateBlogPage from "../create_blog";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock('axios');

describe("Create Blog Page", () => {

 const useParams = jest.spyOn(ReactRouter, 'useParams');

 beforeEach(() => {
  useParams.mockReturnValue({
   slug: '0'
  });
 });

 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = async (id: string | undefined) => {
  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
   auth: {
    access_token: 'access',
    msg: 'msg',
    user: {
     account: 'example@example.com',
     password: 'examplePassword',
     avatar: 'userAvatar.png',
     createdAt: '000000',
     name: 'exampleName',
     role: 'admin',
     type: 'user',
     updatedAt: '000001',
     _id: '0'
    }
   },
   categories: [
    {
     name: 'categoryName',
     createdAt: '000000',
     updatedAt: '000001',
     _id: '0'
    }
   ]
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <CreateBlogPage id={id} />
    </Router>
   </Provider>
  );

  const resolve = Promise.resolve();
  await act(async () => {
   await resolve;
  });

  return {
   container,
   useAppDispatch
  };
 }

 const getSuccess = () => (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
   data: {
    _id: '0',
    user: {
     account: 'example@example.com',
     password: 'examplePassword',
     avatar: 'userAvatar.png',
     createdAt: '000000',
     name: 'exampleName',
     role: 'admin',
     type: 'user',
     updatedAt: '000001',
     _id: '0'
    },
    title: 'blogTitle',
    content: 'This is an example blog',
    description: 'blogDescription',
    thumbnail: 'blogThumbnail.png',
    category: 'blogCategory',
    createdAt: '000000'
   }
 });

 it('renders the create blog page', async () => {
  getSuccess();
  const { container } = await setup('0');
  expect(container).toMatchSnapshot();
 });
});