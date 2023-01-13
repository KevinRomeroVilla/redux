import { areAdvertsLoaded } from "../selectors";
import {
  ADVERT_CREATED,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
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
  return async function (dispatch, getstate, { api }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.login(credentials);
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

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = (adverts) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: adverts,
});

export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
});

export const advertsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areAdvertsLoaded(getState());
    if (areLoaded) return;

    try {
      dispatch(advertLoadedRequest());
      const adverts = await api.adverts.getAdverts();
      dispatch(advertLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      throw error;
    }
  };
};

export const advertCreated = () => ({
  type: ADVERT_CREATED,
});

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
