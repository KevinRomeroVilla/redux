import React from "react";
import { createRoot } from "react-dom/client";
import { configureClient } from "./api/client";
import storage from "./utils/storage";
import "./index.css";
import App from "./components/app";

import { configureStore } from "./store";
import Root from "./components/app/root";
import { createBrowserRouter } from "react-router-dom";

const accessToken = storage.get("auth");
configureClient({ accessToken });

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

const store = configureStore({ auth: !!accessToken }, { router });

const root = createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Root store={store} router={router} />

  //</React.StrictMode>
);
