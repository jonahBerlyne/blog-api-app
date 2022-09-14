import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReduxHooks from "../../../redux/hooks";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import ForgotPasswordPage from "../forgot_password";

describe("Forgot Password Page", () => {
 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = () => {
  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  const { container } = render(
   <Provider store={store}>
    <Router>
     <ForgotPasswordPage />
    </Router>
   </Provider>
  );

  return {
   container,
   useAppDispatch
  };
 }

 it("renders the forgot password page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("sends an email to reset the password", () => {
  const { useAppDispatch } = setup();

  fireEvent.change(screen.getByTestId("account"), {target: {value: "example@example.com"}});
  fireEvent.click(screen.getByTestId("sendBtn"));

  expect(useAppDispatch).toBeCalled();
 });
});