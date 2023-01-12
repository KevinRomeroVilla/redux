import {
  ADVERT_CREATED,
  ADVERT_LOADED,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "../types/types";

const defaultState = {
  auth: false,
  adverts: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, auth: true };
    case AUTH_LOGOUT:
      return { ...state, auth: false };
    case ADVERT_LOADED:
      return { ...state, adverts: action.payload };
    case ADVERT_CREATED:
      return;

    default:
      return state;
  }
}
