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

describe("Update Blog Page", () => {
 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = async () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ slug: '0' });

  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

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
});