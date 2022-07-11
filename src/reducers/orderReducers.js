import { randomNumber } from "../utils";
import {
  GET_ORDER,
  DELETE_ORDER,
  GET_SINGLE_ORDER,
  EDIT_SINGLE_ORDER,
} from "../types";
const initialState = {
  list: [],
  singleOrder: null,
};
const orderReducers = (state = { initialState }, action) => {
  switch (action.type) {
    case GET_ORDER: {
      if (state.list) return state;
      return { ...state, list: action.payload };
    }

    case DELETE_ORDER: {
      return {
        ...state,
        list: state.list.filter((order) => order.id !== action.payload.id),
      };
    }
    case GET_SINGLE_ORDER: {
      return {
        ...state,
        singleOrder: state.list.find((order) => order.id === action.payload),
      };
    }
    case EDIT_SINGLE_ORDER: {
      return {
        ...state,
        list: state.list.map((order) => {
          if (order.id === action.payload.id) {
            return action.payload;
          }
          return order;
        }),
      };
    }

    default:
      return state;
  }
};

export default orderReducers;
