import { login } from "../../components/auth/service";
import {
  ADVERT_CREATED,
  ADVERT_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "../types/types";

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, getstate) {
    try {
      dispatch(authLoginRequest());
      await login(credentials);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export const authlogout = () => ({
  type: AUTH_LOGOUT,
});

export const AdvertLoaded = (adverts) => ({
  type: ADVERT_LOADED,
  payload: adverts,
});

export const advertCreated = () => ({
  type: ADVERT_CREATED,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
