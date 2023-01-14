import { areAdvertsLoaded, getAdvertdetail, tagsDone } from "../selectors";
import {
  ADVERTS_LOADED_FAILURE,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  ADVERT_CREATED_REQUEST,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  GET_TAGS_FAILURE,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
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
  return async function (dispatch, getstate, { api, router }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.login(credentials);
      dispatch(authLoginSuccess());
      const from = router.state.location.state?.from?.pathname || "/";
      router.navigate(from, { replace: true });
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT,
});

export const authlogout = () => {
  return async function (dispatch, getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutSuccess());
  };
};

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = (adverts) => ({
  type: ADVERTS_LOADED_SUCCESS,
  payload: adverts,
});

export const advertsLoadedFailure = (error) => ({
  type: ADVERTS_LOADED_FAILURE,
  payload: error,
});

export const advertsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areAdvertsLoaded(getState());
    if (areLoaded) return;

    try {
      dispatch(advertsLoadedRequest());
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
      throw error;
    }
  };
};

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedSuccess = (advert) => ({
  type: ADVERT_LOADED_SUCCESS,
  payload: advert,
});

export const advertLoadedFailure = (error) => ({
  type: ADVERT_LOADED_FAILURE,
  payload: error,
});

export const advertLoad = (advertId) => {
  return async function (dispatch, getState, { api, router }) {
    const isLoaded = getAdvertdetail(advertId)(getState());
    if (isLoaded) return;

    try {
      dispatch(advertLoadedRequest());
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertLoadedSuccess(advert));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
      if (error.statusCode === 404) {
        router.navigate("/404");
      }
      throw error;
    }
  };
};

export const advertCreatedRequest = () => ({
  type: ADVERT_CREATED_REQUEST,
});

export const advertCreatedSuccess = (advert) => ({
  type: ADVERT_CREATED_SUCCESS,
  payload: advert,
});

export const advertCreatedFailure = (error) => ({
  type: ADVERT_CREATED_FAILURE,
  payload: error,
  error: true,
});

export const advertCreated = (advert) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(advertCreatedRequest());
      const createdAdvert = await api.adverts.createAdvert(advert);
      dispatch(advertCreatedSuccess(createdAdvert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert;
    } catch (error) {
      dispatch(advertCreatedFailure(error));
      if (error.statusCode === 401) {
        router.navigate("/login");
      }
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});

export const getTagsRequest = () => ({
  type: GET_TAGS_REQUEST,
});

export const getTagsSuccess = (tags) => ({
  type: GET_TAGS_SUCCESS,
  payload: tags,
});

export const GetTagsFailure = (error) => ({
  type: GET_TAGS_FAILURE,
  payload: error,
  error: true,
});

export const allTags = () => {
  return async function (dispatch, getState, { api }) {
    const tagsLoaded = tagsDone(getState());
    if (tagsLoaded) return;

    try {
      dispatch(getTagsRequest());
      const allTags = await api.tags.getTags();
      dispatch(getTagsSuccess(allTags));
    } catch (error) {
      dispatch(GetTagsFailure(error));
      throw error;
    }
  };
};
