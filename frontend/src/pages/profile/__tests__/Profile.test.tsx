import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import * as ReduxHooks from "../../../redux/hooks";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import ProfilePage from "../[slug]";

describe("Profile Page", () => {
 const useLocation = jest.spyOn(ReactRouter, 'useLocation');

 const navigate = jest.fn();
 const useNavigate = jest.spyOn(ReactRouter, 'useNavigate');
    
 beforeEach(() => {
  useLocation.mockReturnValue({ search: '?testQueryParameters' } as any);
  useNavigate.mockReturnValue(navigate);
 });

 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = (slug: string) => {
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ slug });

  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
   auth: {
    access_token: 'access',
    msg: 'success',
    user: {
     account: 'example@example.com',
     password: 'examplePassword',
     avatar: 'userAvatar.png',
     createdAt: '000000',
     name: 'userName',
     role: 'admin',
     type: 'user',
     updatedAt: '000001',
     _id: '0'
    }
   },
   blogsUser: [{
     id: '0',
     blogs: [{
       _id: '0',
       user: {
        account: 'example@example.com',
        password: 'examplePassword',
        avatar: 'userAvatar.png',
        createdAt: '000000',
        name: 'userName',
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
     }],
     total: '1',
     search: 'search'
   }],
   otherInfo: [{
     account: 'example@example.com',
     password: 'examplePassword',
     avatar: 'userAvatar.png',
     createdAt: '000000',
     name: 'userName',
     role: 'admin',
     type: 'user',
     updatedAt: '000001',
     _id: '1'
   }],
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <ProfilePage />
    </Router>
   </Provider>
  );

  return {
   container,
   useAppDispatch
  };
 }

 it("renders the profile page", () => {
  const { container } = setup('0');
  expect(container).toMatchSnapshot();
 });

 it("renders the user info component", () => {
  setup('0');

  expect(screen.queryByTestId('otherInfo')).not.toBeInTheDocument();
  expect(screen.getByTestId('userInfo')).toBeInTheDocument();
 });

 it("updates the user info", () => {
  const { useAppDispatch } = setup('0');

  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(['example'], 'example.png', { type: 'image/png' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });
  fireEvent.change(screen.getByTestId("name"), {target: {value: "newName"}});
  fireEvent.change(screen.getByTestId("account"), {target: {value: "new@email.com"}});
  fireEvent.change(screen.getByTestId("password"), {target: {value: "newPassword"}});
  fireEvent.change(screen.getByTestId("confirmPassword"), {target: {value: "newPassword"}});

  fireEvent.click(screen.getByTestId('updateBtn'));
  
  expect(useAppDispatch).toBeCalled();
 });

 it("renders the other info component", () => {
  setup('1');

  expect(screen.queryByTestId('userInfo')).not.toBeInTheDocument();
  expect(screen.getByTestId('otherInfo')).toBeInTheDocument();
 });

 it("display other user info", () => {
  setup('1');

  expect(screen.getByTestId('avatar').getAttribute('src')).toEqual('userAvatar.png');
  expect(screen.getByTestId('role').innerHTML).toEqual('admin');
  expect(screen.getByTestId('name').textContent).toEqual('Name: userName');
  expect(screen.getByTestId('account').innerHTML).toEqual('example@example.com');
 });

 it("displays the blog card", () => {
  setup('0');

  expect(screen.getByTestId('blogThumbnail').getAttribute('src')).toEqual('blogThumbnail.png');
  expect(screen.getByTestId('blogTitle').textContent).toEqual('blogTitle');
  expect(screen.getByTestId('blogDescription').innerHTML).toEqual('blogDescription');
 });

 it("deletes the blog", () => {
  window.confirm = jest.fn(() => true);
  const { useAppDispatch } = setup('0');

  fireEvent.click(screen.getByTestId("deleteBtn"));

  expect(useAppDispatch).toBeCalled();
 });
});