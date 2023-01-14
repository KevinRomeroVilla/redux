import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

//import { adverts, auth } from "./Reducers/reducers";
import * as reducers from "./Reducers/reducers";
import * as auth from "../components/auth/service";
import * as adverts from "../components/adverts/service";
import * as tags from "../components/adverts/servicetags";

//const reducer = combineReducers({auth, adverts})
const reducer = combineReducers(reducers);

export function configureStore(preloadedState, { router }) {
  const middelware = [
    thunk.withExtraArgument({ api: { auth, adverts, tags }, router }),
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middelware))
  );

  return store;
}
