import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../index";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';

describe("Home Page", () => {
 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({
   homeBlogs: [{
    _id: '0',
    name: 'homeBlogName',
    count: 1,
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
     content: 'This is an example blog.',
     description: 'blogDescription',
     thumbnail: 'blogThumbnail.png',
     category: 'blogCategory',
     createdAt: '000000'
    }]
   }]
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <HomePage />
    </Router>
   </Provider>
  );

  return {
   container
  };
 }

 it("renders the home page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("displays the blog card", () => {
  setup();

  expect(screen.getByTestId("blogThumbnail").getAttribute("src")).toEqual("blogThumbnail.png");
  expect(screen.getByTestId("blogTitle").textContent).toEqual("blogTitle...");
  expect(screen.getByTestId("blogDescription").innerHTML).toEqual("blogDescription...");
  expect(screen.getByTestId("blogUserName").textContent).toEqual("By: userName");
 });
});