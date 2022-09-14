import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
import userEvent from "@testing-library/user-event";

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
    category: 'blogCategoryZero',
    createdAt: '000000'
   }
 });

 it('renders the create blog page', async () => {
  getSuccess();
  const { container } = await setup('0');
  expect(container).toMatchSnapshot();
 });

 it("displays the blog fetched", async () => {
  getSuccess();
  await setup('0');

  expect(screen.getByTestId('blogThumbnail').getAttribute('src')).toEqual('blogThumbnail.png');
  expect(screen.getByTestId('blogTitle').textContent).toEqual('blogTitle');
  expect(screen.getByTestId('blogDescription').innerHTML).toEqual('blogDescription');
 });

 it("deletes the blog fetched", async () => {
  getSuccess();
  window.confirm = jest.fn(() => true);

  const { useAppDispatch } = await setup('0');

  fireEvent.click(screen.getByTestId("deleteBtn"));

  expect(useAppDispatch).toBeCalled();
 });

 it("updates the blog fetched", async () => {
  getSuccess();

  const { useAppDispatch } = await setup('0');

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

 it("creates a new blog", async () => {
  const { useAppDispatch } = await setup(undefined);

  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(['example'], 'example.png', { type: 'image/png' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });
  fireEvent.change(screen.getByTestId("blogTitleInput"), {target: {value: "newTitle"}});
  fireEvent.change(screen.getByTestId("blogDescriptionInput"), {target: {value: "newDescription"}});
  userEvent.selectOptions(screen.getByTestId("blogCategoryMenu"), "blogCategoryOne");

  expect(screen.getByTestId('postBtn').innerHTML).not.toEqual('Update Post');
  expect(screen.getByTestId('postBtn').innerHTML).toEqual('Create Post');
  fireEvent.click(screen.getByTestId('postBtn'));

  expect(useAppDispatch).toBeCalled();
 });
});