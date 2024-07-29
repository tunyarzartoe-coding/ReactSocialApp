import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import MainNavbar from "./MainNavbar";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <MainNavbar/>
      <main className="App">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
