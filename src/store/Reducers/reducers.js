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

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERT_LOADED:
      return action.payload;
    case ADVERT_CREATED:
      return;
    default:
      return state;
  }
}

// export default function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true };
//     case AUTH_LOGOUT:
//       return { ...state, auth: false };
//     case ADVERT_LOADED:
//       return { ...state, adverts: action.payload };
//     case ADVERT_CREATED:
//       return;
//     default:
//       return state;
//   }
// }

// export default function reducer(state = defaultState, action) {
//   return {
//     auth: authReducer(state.auth, action),
//     adverts: advertsReducer(state.adverts, action),
//   };
// }
