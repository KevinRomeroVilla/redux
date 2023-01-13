import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

//import { adverts, auth } from "./Reducers/reducers";
import * as reducers from "./Reducers/reducers";
//const reducer = combineReducers({auth, adverts})
const reducer = combineReducers(reducers);
const middelware = [thunk];

export function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middelware))
  );

  return store;
}
