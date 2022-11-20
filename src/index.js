import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { TodosContextProvider } from "./store/todos-context";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
