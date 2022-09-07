import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import * as ReduxHooks from "../../../redux/hooks";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import LoginPage from "../login";
import RegisterPage from "../register";

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

  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const { container } = render(
   <Provider store={store}>
    <Router>
     <LoginPage />
    </Router>
   </Provider>
  );

  return {
   container,
   useAppDispatch
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
  const { useAppDispatch } = setup();

  fireEvent.change(screen.getByTestId("account"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("password"), {target: {value: "example"}});

  fireEvent.click(screen.getByTestId("loginBtn"));
  
  expect(useAppDispatch).toBeCalled();
 });

 it("logs in the user via sms", () => {
  const { useAppDispatch } = setup();

  fireEvent.click(screen.getByTestId("smsToggle"));
  fireEvent.change(screen.getByTestId("phone"), {target: {value: "1234567890"}});
  fireEvent.click(screen.getByTestId("smsLoginBtn"));
  
  expect(useAppDispatch).toBeCalled();
 });
});

describe("Register Page", () => {
 const useLocation = jest.spyOn(ReactRouter, 'useLocation');
    
 beforeEach(() => {
  useLocation.mockReturnValue({ search: '?testQueryParameters' } as any);
 });

 const setup = () => {
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({});

  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const { container } = render(
   <Provider store={store}>
    <Router>
     <RegisterPage />
    </Router>
   </Provider>
  );

  return {
   container,
   useAppDispatch
  };
 }

 it("renders the register page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("registers the user", () => {
  const { useAppDispatch } = setup();

  fireEvent.change(screen.getByTestId("name"), {target: {value: "exampleName"}});
  fireEvent.change(screen.getByTestId("account"), {target: {value: "example@example.com"}});
  fireEvent.change(screen.getByTestId("password"), {target: {value: "examplePassword"}});
  fireEvent.change(screen.getByTestId("confirmPassword"), {target: {value: "examplePassword"}});
  fireEvent.click(screen.getByTestId("registerBtn"));
  
  expect(useAppDispatch).toBeCalled();
 });
});