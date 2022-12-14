import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import BlogPage from "../[slug]";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock('axios');

describe("Blog Page", () => {
 const useLocation = jest.spyOn(ReactRouter, 'useLocation');
 const useNavigate = jest.spyOn(ReactRouter, 'useNavigate');
 const useParams = jest.spyOn(ReactRouter, 'useParams');

 beforeEach(() => {
  useLocation.mockReturnValue({ search: '?testQueryParameters' } as any);
  useNavigate.mockReturnThis();
  useParams.mockReturnValue({
   slug: 'slugExample'
  });
 });

 afterEach(() => {
  jest.resetAllMocks();
 });
 
 const setup = async () => { 
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
   auth: {
    access_token: null,
    user: {
     avatar: 'user0.png',
     _id: '0',
     name: 'Zero'
    }
   },
   comments: {
    data: null,
    total: 0
   },
   socket: null
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <BlogPage />
    </Router>
   </Provider>
  );

  const resolve = Promise.resolve();
  await act(async () => {
   await resolve;
  });

  return {
   container
  };
 }

 const getSuccess = () => (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
   data: {
    _id: '0',
    content: 'This is an example blog post.',
    title: 'Example Title',
    user: {
     name: 'exampleName',
    },
    createdAt: '000000'
   }
 });

 const getFailure = () => (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
   response: {
    data: {
     msg: new Error('Error Msg Example').message
    }
   }
 });

 it("renders the blog page", async () => {
  getSuccess();
  const { container } = await setup();
  expect(container).toMatchSnapshot();
 });

 it("displays the blog", async () => {
  getSuccess();
  await setup();

  expect(screen.getByTestId("blogTitle").innerHTML).toEqual("Example Title");
  expect(screen.getByTestId("blogUserName").innerHTML).toEqual("By: exampleName");
  expect(screen.getByTestId("blogContent").innerHTML).toEqual("This is an example blog post.");
 });

 it("fails to display the blog", async () => {
  getFailure();
  await setup();

  expect(screen.queryByTestId('blogTitle')).not.toBeInTheDocument();
  expect(screen.getByTestId('errMsg').innerHTML).toEqual('Error Msg Example');
 });
});