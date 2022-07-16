import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./reducer/customer"
import orderReducer from "./reducer/order"
import productReducer from "./reducer/product"

const rootReducer = {
    customerReducer,
    orderReducer,
    productReducer
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
