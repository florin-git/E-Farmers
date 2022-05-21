import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          E-Farmers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"insertions/"}>
                Insertions
              </Link>
            </li>

          </ul>
          <ul className="navbar-nav navabr-right">
            <li className="nav-item">
              <Link className="btn btn-primary" to={"insertions/new/"}>
                Publish an Insertion
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-primary mx-md-2" to={"register/"}>
                Sign Up
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-primary" to={"login/"}>
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-primary" to={"logout/"}>
                Logout
              </Link>
            </li>

            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
