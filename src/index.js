import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";

import { getAllPosts } from "./components/posts/postSlice";
import {  getAllUsers } from "./components/users/userSlice";

store.dispatch(getAllPosts())
store.dispatch(getAllUsers())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
