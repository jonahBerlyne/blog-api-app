import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import * as ReduxHooks from "../../../redux/hooks";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import UpdateBlogPage from "../[slug]";
import axios from "axios";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock('axios');

describe("Update Blog Page", () => {
 afterEach(() => {
  jest.resetAllMocks();
 });

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
    category: 'blogCategoryZero',
    createdAt: '000000'
   }
 });

 const setup = async () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ slug: '0' });

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
     name: 'blogCategoryZero',
     createdAt: '000000',
     updatedAt: '000001',
     _id: '0'
    },
    {
     name: 'blogCategoryOne',
     createdAt: '000002',
     updatedAt: '000003',
     _id: '1'
    }
   ]
  });

  getSuccess();

  const { container } = render(
   <Provider store={store}>
    <Router>
     <UpdateBlogPage />
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

 it('renders the update blog page', async () => {
  const { container } = await setup();
  expect(container).toMatchSnapshot();
 });

 it("displays the blog fetched", async () => {
  await setup();

  expect(screen.getByTestId('blogThumbnail').getAttribute('src')).toEqual('blogThumbnail.png');
  expect(screen.getByTestId('blogTitle').textContent).toEqual('blogTitle');
  expect(screen.getByTestId('blogDescription').innerHTML).toEqual('blogDescription');
 });

 it("updates the blog fetched", async () => {
  const { useAppDispatch } = await setup();

  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(['example'], 'example.png', { type: 'image/png' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });
  fireEvent.change(screen.getByTestId("blogTitleInput"), {target: {value: "newTitle"}});
  fireEvent.change(screen.getByTestId("blogDescriptionInput"), {target: {value: "newDescription"}});
  userEvent.selectOptions(screen.getByTestId("blogCategoryMenu"), "blogCategoryOne");

  expect(screen.getByTestId('postBtn').innerHTML).not.toEqual('Create Post');
  expect(screen.getByTestId('postBtn').innerHTML).toEqual('Update Post');
  fireEvent.click(screen.getByTestId('postBtn'));

  expect(useAppDispatch).toBeCalled();
 });
});