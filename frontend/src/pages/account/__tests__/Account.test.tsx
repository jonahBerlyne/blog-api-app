import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReactRouter from 'react-router';
import AccountActivationPage from "../[slug]";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock('axios');

describe("Account Activation Page", () => {
 const useParams = jest.spyOn(ReactRouter, 'useParams');

 beforeEach(() => {
  useParams.mockReturnValue({
   slug: 'slugExample'
  });
 });

 afterEach(() => {
  jest.resetAllMocks();
 });
 
 const setup = async () => {  
  const { container } = render(
   <Router>
    <AccountActivationPage />
   </Router>
  );

  const resolve = Promise.resolve();
  await act(async () => {
   await resolve;
  });

  return {
   container
  };
 }

 it("renders the account activation page", async () => {
  (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
   data: {
    msg: 'Success Msg Example'
   }
  });

  const { container } = await setup();

  expect(container).toMatchSnapshot();
 });

 it("shows an account activation success msg", async () => {
  (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
   data: {
    msg: 'Success Msg Example'
   }
  });

  await setup();

  expect(screen.queryByTestId('errMsg')).not.toBeInTheDocument();
  expect(screen.getByTestId('successMsg').innerHTML).toEqual('Success Msg Example');
 });

 it("shows an account activation error msg", async () => {
  (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue({
   response: {
    data: {
     msg: new Error('Error Msg Example').message
    }
   }
  });

  await setup();

  expect(screen.queryByTestId('successMsg')).not.toBeInTheDocument();
  expect(screen.getByTestId('errMsg').innerHTML).toEqual('Error Msg Example');
 });
});