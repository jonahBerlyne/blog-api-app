import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import * as ReduxHooks from "../../../redux/hooks";
import ResetPasswordPage from "../[slug]";

describe("Reset Password Page", () => {
 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ slug: 'example' });

  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const { container } = render(
   <Router>
    <ResetPasswordPage />
   </Router>
  );

  return {
   container,
   useAppDispatch
  };
 }

 it("renders the reset password page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });
});