import { database } from "../api/database";
import {
  GET_CUSTOMERS,
  DELETE_CUSTOMER,
  EDIT_SINGLE_CUSTOMER,
  ADD_NEW_CUSTOMER,
  GET_SINGLE_CUSTOMER,
} from "../types";

export const getCustomers = () => {
  const { customers } = database;

  return {
    type: GET_CUSTOMERS,
    payload: customers,
  };
};

export const deleteCustomer = (customer) => {
  return {
    type: DELETE_CUSTOMER,
    payload: customer,
  };
};

export const editSingleCustomer = (customer) => {
  return {
    type: EDIT_SINGLE_CUSTOMER,
    payload: customer,
  };
};

export const addNewCustomer = (newCustomer) => {
  return {
    type: ADD_NEW_CUSTOMER,
    payload: newCustomer,
  };
};
export const getSingleCustomer = (customer) => {
  return {
    type: GET_SINGLE_CUSTOMER,
    payload: customer,
  };
};
