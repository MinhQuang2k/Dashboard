import { combineReducers } from "redux";
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
import orderReducers from "./orderReducers";
import customerReducers from "./customerReducers";
import authReducers from "./authReducers";

const rootReducer = combineReducers({
  product: productReducers,
  category: categoryReducers,
  order: orderReducers,
  customer: customerReducers,
  auth: authReducers,
});

export default rootReducer;
