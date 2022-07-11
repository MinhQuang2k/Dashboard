import { LOGIN_USER, LOGOUT_USER } from "../types";

const initialState = {
  user: null,
  isAuthenticated: false,
};
const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      console.log("login");
      if (action.payload.user) {
        return {
          user: action.payload.user,
          isAuthenticated: true,
        };
      }
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    case LOGOUT_USER: {
      console.log("logout");
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    default:
      return state;
  }
};

export default authReducers;
