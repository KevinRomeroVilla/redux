import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETE_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  //ADVERT_CREATED,
  //AUTH_LOGIN_FAILURE,
  //AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  GET_TAGS_SUCCESS,
  UI_RESET_ERROR,
} from "../types/types";

export const defaultState = {
  auth: false,
  tags: {
    tagsLoaded: false,
    data: [],
  },
  adverts: {
    areLoaded: false,
    data: [],
  },
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
    case ADVERTS_LOADED_SUCCESS:
      return { areLoaded: true, data: action.payload };
    case ADVERT_LOADED_SUCCESS:
      return { ...state, data: [...state.data, action.payload] };
    case ADVERT_CREATED_SUCCESS:
      return { ...state, data: [action.payload, ...state.data] };
    case ADVERT_DELETE_SUCCESS:
      return state;
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case GET_TAGS_SUCCESS:
      return { tagsLoaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return {
      isLoading: false,
      error: action.payload,
    };
  }

  if (/_REQUEST$/.test(action.type)) {
    return {
      error: null,
      isLoading: true,
    };
  }
  if (/_SUCCESS$/.test(action.type)) {
    return {
      error: null,
      isLoading: false,
    };
  }

  if (/_FAILURE$/.test(action.type)) {
    return {
      error: null,
      isLoading: false,
    };
  }

  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  return state;
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
