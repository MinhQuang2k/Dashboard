import { database } from "../api/database";
import { GET_CATEGORY } from "../types";

export const getCategory = () => {
  const { categories } = database;

  return {
    type: GET_CATEGORY,
    payload: categories,
  };
};
