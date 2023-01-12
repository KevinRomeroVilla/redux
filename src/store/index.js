import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import reducer from "./Reducers/reducers";

export function configureStore() {
  const store = createStore(reducer, composeWithDevTools());

  return store;
}
