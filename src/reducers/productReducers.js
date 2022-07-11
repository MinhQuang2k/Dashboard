import { randomNumber } from "../utils";
import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_SINGLE_PRODUCT,
  EDIT_SINGLE_PRODUCT,
  ADD_NEW_PRODUCT,
} from "../types";
const initialState = {
  list: [],
  singleProduct: null,
};
const productReducers = (
  state = {
    initialState,
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      if (state.list) return state;
      return { ...state, list: action.payload };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        list: state.list.filter((product) => product.id !== action.payload.id),
      };
    }
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: state.list.find(
          (product) => product.id === action.payload
        ),
      };
    case EDIT_SINGLE_PRODUCT:
      return {
        ...state,
        list: state.list.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };
    case ADD_NEW_PRODUCT:
      const newProduct = action.payload;
      newProduct.id = randomNumber();

      const newList = [...state.list];
      newList.unshift(newProduct);
      return { ...state, list: newList };

    default:
      return state;
  }
};

export default productReducers;
