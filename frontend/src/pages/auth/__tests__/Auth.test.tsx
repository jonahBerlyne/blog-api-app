import React from "react";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import { useAppDispatch } from "../../../redux/hooks";
import * as ReactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import LoginPage from "../login";

const mockDispatchFn = jest.fn()

jest.mock('hooks/redux', () => ({
  ...jest.requireActual('hooks/redux'),
  useAppDispatch: () => mockDispatchFn,
}));

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
   <ReactRedux.Provider store={store}>
    <Router>
     <LoginPage />
    </Router>
   </ReactRedux.Provider>
  );

  return {
   container
  };
 }

 it("renders the login page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("toggles between the login forms", () => {
  setup();

  fireEvent.click(screen.getByTestId("smsToggle"));
  expect(screen.getByTestId("smsLoginForm")).toBeInTheDocument();
  expect(screen.queryByTestId("regLoginForm")).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId("smsToggle"));
  expect(screen.getByTestId("regLoginForm")).toBeInTheDocument();
  expect(screen.queryByTestId("smsLoginForm")).not.toBeInTheDocument();
 });
 
 it("logs in the user", () => {
  setup();

  fireEvent.change(screen.getByTestId("account"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("password"), {target: {value: "example"}});

  fireEvent.click(screen.getByTestId("loginBtn"));
  
  expect(mockDispatchFn).toBeCalled();
 });
});