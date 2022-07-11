import { database } from "../api/database";
import { LOGIN_USER, LOGOUT_USER } from "../types";

let refreshTokenTimeoutId = null;

export const loginUser = (loginForm) => (dispatch) => {
  const { token } = database;
  if (
    loginForm.username === token.user.email &&
    loginForm.password === token.user.password
  ) {
    dispatch({
      type: LOGIN_USER,
      payload: { user: token.user },
    });
    return { success: true, message: "login success" };
  }

  dispatch({
    type: LOGIN_USER,
    payload: { user: null },
  });

  return { success: false, message: "login fail" };
};

export const logoutUser = () => {
  abortRefreshToken();
  return {
    type: LOGOUT_USER,
  };
};

export const abortRefreshToken = () => {
  if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
};

export const setRefreshTokenTimeout = (delay) => (dispatch) => {
  refreshTokenTimeoutId = window.setTimeout(() => {
    dispatch(logoutUser());
  }, delay * 1000);
};
