import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import * as ReduxHooks from "../../../redux/hooks";
import CategoryPage from "../category";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';

describe("Category Page", () => {

 afterEach(() => {
  jest.resetAllMocks();
 });

 const setup = () => {
  const dispatch = jest.fn();
  const useAppDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch').mockReturnValue(dispatch);

  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
   auth: {
    access_token: 'access',
    user: {
     role: 'admin'
    }
   },
   categories: [
    {
     name: 'example0',
     createdAt: '000000',
     updatedAt: '000001',
     _id: '0'
    },
    {
     name: 'example1',
     createdAt: '000002',
     updatedAt: '000003',
     _id: '1'
    }
   ]
  });

  const { container } = render(
   <Provider store={store}>
    <Router>
     <CategoryPage />
    </Router>
   </Provider>
  );

  return {
   container,
   useAppDispatch
  };
 }

 it("renders the category page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 });

 it("creates a new category", () => {
  const { useAppDispatch } = setup();

  fireEvent.change(screen.getByTestId("name"), {target: {value: "example2"}});
  fireEvent.click(screen.getByTestId('submitBtn'));

  expect(useAppDispatch).toBeCalled();
 });

 it("displays the categories", () => {
  setup();

  expect(screen.getByTestId('categoryName0').innerHTML).toEqual("example0");
  expect(screen.getByTestId('categoryName1').innerHTML).toEqual("example1");
 });

 it("edits a category", () => {
  const { useAppDispatch } = setup();

  fireEvent.click(screen.getByTestId('editBtn0'));

  expect(screen.getByTestId("name")).toHaveValue("example0");
  fireEvent.change(screen.getByTestId("name"), {target: {value: "example2"}});

  expect(screen.getByTestId('dontEditBtn')).toBeInTheDocument();
  expect(screen.getByTestId('submitBtn').innerHTML).not.toEqual('Create');
  expect(screen.getByTestId('submitBtn').innerHTML).toEqual('Update');
  fireEvent.click(screen.getByTestId('submitBtn'));

  expect(useAppDispatch).toBeCalled();
 });

 it("deletes a category", () => {
  window.confirm = jest.fn(() => true);

  const { useAppDispatch } = setup();

  fireEvent.click(screen.getByTestId('deleteBtn0'));

  expect(useAppDispatch).toBeCalled();
 });
});