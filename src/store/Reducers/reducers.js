import {
  ADVERT_CREATED,
  ADVERT_LOADED,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
} from "../types/types";

const defaultState = {
  auth: false,
  adverts: [],
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
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

export function ui(state = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        error: null,
        isLoading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        error: null,
        isLoading: false,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        error: action.payload,
        isLoading: false,
      };
    case UI_RESET_ERROR:
      return {
        ...state,
        error: null,
      };
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
