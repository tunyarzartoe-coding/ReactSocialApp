import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light sticky-top">
      <div class="container text-white">
        <Link class="navbar-brand logo d-flex" to="/">
          <div className="">
            <img
              src="/network.png"
              alt="logo"
              width="30"
              height="32"
              class="d-inline-block align-text-top p-1 "
            />
          </div>
          <div className="px-1">
            <span>Social App</span>
          </div>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                <span>Home</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/post">
                <span>Post</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
