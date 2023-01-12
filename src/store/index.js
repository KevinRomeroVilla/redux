import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

//import { adverts, auth } from "./Reducers/reducers";
import * as reducers from "./Reducers/reducers";
//const reducer = combineReducers({auth, adverts})
const reducer = combineReducers(reducers);

export function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools());

  return store;
}
