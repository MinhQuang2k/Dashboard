import { randomNumber } from "../utils";
import {
  GET_CUSTOMERS,
  DELETE_CUSTOMER,
  EDIT_SINGLE_CUSTOMER,
  ADD_NEW_CUSTOMER,
  GET_SINGLE_CUSTOMER,
} from "../types";

const initialState = {
  list: [],
  singleCustomer: null,
};
const customerReducers = (
  state = {
    initialState,
  },
  action
) => {
  switch (action.type) {
    case GET_CUSTOMERS: {
      if (state.list) return state;
      return { ...state, list: action.payload };
    }

    case DELETE_CUSTOMER: {
      return {
        ...state,
        list: state.list.filter(
          (customer) => customer.id !== action.payload.id
        ),
      };
    }

    case GET_SINGLE_CUSTOMER:
      return {
        ...state,
        singleCustomer: state.list.find(
          (customer) => customer.id === action.payload
        ),
      };

    case EDIT_SINGLE_CUSTOMER:
      return {
        ...state,
        list: state.list.map((customer) => {
          if (customer.id === action.payload.id) {
            customer.firstname = action.payload.firstname;
            customer.lastname = action.payload.lastname;
            customer.rewards = action.payload.rewards;
            customer.email = action.payload.email;
            customer.mobile = action.payload.mobile;
            customer.avatar = action.payload.avatar;
          }
          return customer;
        }),
      };

    case ADD_NEW_CUSTOMER:
      const newCustomer = action.payload;
      newCustomer.id = randomNumber();
      newCustomer.membership = false;
      const newList = [...state.list];
      newList.unshift(newCustomer);
      return { ...state, list: newList };

    default:
      return state;
  }
};

export default customerReducers;
