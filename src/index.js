import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// store.dispatch(getAllUsers())
// store.dispatch(getAllPosts())

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider > */}
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    {/* </Provider> */}
  </React.StrictMode>
);
