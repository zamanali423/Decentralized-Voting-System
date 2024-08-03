import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { userContext } from "../context/userContext/userContext";
import Logout from "../pages/Logout";

const Navbar = () => {
  const { isLogin } = useContext(userContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          className="navbar-brand ms-5 fw-bold"
          to="/"
          style={{ width: "10%" }}
        >
          <img src={logo} alt="Voting System" className="w-75" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {isLogin ? (
              <Logout />
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
