import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        {/* <p> */}
          &copy; {new Date().getFullYear()} | Tun Yar Zar Toe. All rights
          reserved.
        {/* </p> */}
      </div>
    </footer>
  );
};

export default Footer;
