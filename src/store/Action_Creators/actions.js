import {
  ADVERT_CREATED,
  ADVERT_LOADED,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "../types/types";

export const authlogin = () => ({
  type: AUTH_LOGIN,
});

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
