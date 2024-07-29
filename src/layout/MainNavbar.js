import { Button, Dropdown, Form, Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";

const MainNavbar = () => {
  const location = useLocation();

  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 text-white"
          sticky="top"
        >
          <Container className="main-navbar">
            <Navbar.Brand
              href="/"
              className="d-flex"
              style={{ color: "#c6c6c6" }}
            >
              <div className="">
                <img
                  src="/network.png"
                  alt="logo"
                  width="30"
                  height="32"
                  className="d-inline-block align-text-top p-1"
                />
              </div>
              <div className="px-1">
                <span>Social App</span>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  style={{ color: "#c6c6c6" }}
                >
                  Social App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="text-white justify-content-end flex-grow-1 me-5">
                <Nav variant="pills" className="text-center">
                  <Nav.Item>
                    <Nav.Link
                      className={` ms-2 mb-2 ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                    >
                      <Link
                        to="/"
                        className="text-center"
                        style={{ textDecoration: "none", color: "#c6c6c6" }}
                      >
                        Home
                      </Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      // href="/post/post-table"
                      className={` ms-2 mb-2 ${
                        location.pathname === "/post/post-table" ? "active" : ""
                      }`}
                    >
                      <Link
                        to="/post/post-table"
                        className="text-center"
                        style={{ textDecoration: "none", color: "#c6c6c6" }}
                      >
                        Posts
                      </Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      // href="/post/post-table"
                      className={` ms-2 mb-2 ${
                        location.pathname === "/users" ? "active" : ""
                      }`}
                    >
                      <Link
                        to="/users"
                        className="text-center"
                        style={{ textDecoration: "none", color: "#c6c6c6" }}
                      >
                        Users
                      </Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default MainNavbar;
