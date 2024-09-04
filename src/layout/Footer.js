import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        {/* <p> */}
        &copy; {new Date().getFullYear()} |
        <Link
          className="px-1 footer-text"
          href="https://github.com/tunyarzartoe-coding"
          target="_blank"
          // rel="noopener noreferrer"
          // className="footer-link"
        >
          Tun Yar Zar Toe
        </Link>
        . All rights reserved.
        {/* </p> */}
      </div>
    </footer>
  );
};

export default Footer;
