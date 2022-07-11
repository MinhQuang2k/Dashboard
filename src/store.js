import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const saveToLocalStorage = (state) => {
  try {
    const dashboardState = JSON.stringify(state);
    localStorage.setItem("dashboardState", dashboardState);
  } catch (e) {
    console.warn(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const dashboardState = localStorage.getItem("dashboardState");
    if (dashboardState === null) return undefined;
    return JSON.parse(dashboardState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};
const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  applyMiddleware(thunk)
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
