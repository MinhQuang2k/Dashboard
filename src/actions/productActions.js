import { database } from "../api/database";
import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  GET_SINGLE_PRODUCT,
  EDIT_SINGLE_PRODUCT,
  ADD_NEW_PRODUCT,
} from "../types";

export const getProducts = () => {
  const { products } = database;
  const { categories } = database;

  const data = products.map((product) => {
    const category = categories.find((cate) => cate.id === product.categoryId);

    return { ...product, category: category.name };
  });

  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    payload: product,
  };
};

export const getSingleProduct = (id) => {
  return {
    type: GET_SINGLE_PRODUCT,
    payload: id,
  };
};

export const editSingleProduct = (product) => {
  return {
    type: EDIT_SINGLE_PRODUCT,
    payload: product,
  };
};

export const addNewProduct = (newProduct) => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: newProduct,
  };
};
