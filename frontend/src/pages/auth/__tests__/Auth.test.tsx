import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import LoginPage from "../login";

describe("Login Page", () => {

 const useLocation = jest.spyOn(ReactRouter, 'useLocation');
 const useNavigate = jest.spyOn(ReactRouter, 'useNavigate');
    
 beforeEach(() => {
  useLocation.mockReturnValue({ search: '?testQueryParameters' } as any);
  useNavigate.mockReturnThis();
 });

 const setup = () => {
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
   auth: {
    access_token: null
   }
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <LoginPage />
    </Router>
   </Provider>
  );

  return {
   container
  };
 }

 it("renders the login page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });
});