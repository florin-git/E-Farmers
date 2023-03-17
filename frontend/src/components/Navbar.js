import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

import useInterval from "../hooks/useInterval";
import usePeriodicalAPICall from "../hooks/usePeriodicalAPICall";

function Navbar(props) {
  // Authentication data from context storage
  const { auth } = useAuth();
  // If the userId exists, then true; else false
  const isLoggedIn = auth?.userId ? true : false;
  const isFarmer = auth?.accountType === 1;

  // console.log()

  // This variable is used for the redirection
  const navigate = useNavigate();

  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/");
  };

  // Manage notifications
  const [notifications, setNotifications] = useState([]);
  const delay = 10000; // 100s

  /**
   * The 'usePeriodicalAPICall' hook check new publishing notification
   * from the farmers the user is subscribed to
   */
  const getNotifications = usePeriodicalAPICall();

  // This function is called every 'delay' interval if the user is logged in
  useInterval(
    async () => {
      await getNotifications();
      const currentNotification = sessionStorage.getItem("msg");
      if (currentNotification?.length > 0)
        setNotifications(currentNotification.split(","));
    },
    isLoggedIn ? delay : null
  );

  const deleteNotifications = async () => {
    setNotifications([]);
    sessionStorage.setItem("msg", "");
  };

  function deleteNotification(idx) {
    // Keep all the notifications except the one visited
    const newNotifications = notifications.filter(
      (prevNotification, preIdx) => preIdx !== idx
    );
    setNotifications(newNotifications);
    sessionStorage.setItem("msg", newNotifications);
  }

  const notifications_array = notifications.map((notification, idx) => {
    const farmerId = notification.split("-")[0];
    const message = notification.split("-")[1];

    return (
      <li className="nav-item">
        <Link
          className="nav-link"
          aria-current="page"
          to={`/farmer/profile/${farmerId}/`}
          onClick={() => {
            deleteNotification(idx);
          }}
        >
          {message}
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
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
            <li>
              <Link className="nav-link" to={"calendar/"}>
                Calendar
              </Link>
            </li>
            {isLoggedIn && (
              <React.Fragment>
                <li>
                  <Link className="nav-link" to={"booking/"}>
                    Booked products
                  </Link>
                </li>
                {isFarmer && (
                  <li>
                    <Link className="nav-link" to={"inbox/"}>
                      Inbox
                    </Link>
                  </li>
                )}
              </React.Fragment>
            )}
          </ul>
          <ul className="navbar-nav navbar-right">
            {/* <li className="nav-item">
              <Link className="btn btn-primary mx-md-2" to={"insertions/new/"}>
                Publish an Insertion
              </Link>
            </li> */}

            {/* If you are NOT logged in, then the Login
              button is displayed */}
            {!isLoggedIn && (
              <div className="d-flex mt-2 mt-md-0">
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
              </div>
            )}
            {/* If you are logged in, then the Logout
              button is displayed */}
            {isLoggedIn && (
              <div className="d-flex mt-2 mt-md-0">
                <li className="nav-item dropdown">
                  <div
                    className="icon dropdown mx-md-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => {}}
                  >
                    <FontAwesomeIcon icon={faBell} />
                    {notifications?.length > 0 && (
                      <div className="counter">{notifications.length}</div>
                    )}
                  </div>
                  <ul
                    className="dropdown-menu notification-dropdown"
                    aria-labelledby="navbarDropdown"
                  >
                    {notifications_array}
                    {/* <li>
                      <a className="dropdown-item" href="#">
                        Ciccio publishes a new box
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li> */}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={deleteNotifications}
                      >
                        Mark as read
                      </button>
                    </li>
                  </ul>
                </li>
                {isFarmer && (
                  <li className="nav-item">
                    <Link
                      className="btn btn-primary mx-md-2"
                      to={"insertions/new/"}
                    >
                      Publish an Insertion
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    className="btn btn-primary mx-md-2"
                    to={"user/profile/"}
                  >
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="btn btn-primary mx-md-2"
                    to={"user/cart/"}
                  >
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={signOut}>
                    Logout
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

<div className="card mb-3">
  <div className="row g-0">
    <div className="col-md-8">
      <div className="card-body p-4"></div>
    </div>
  </div>
</div>;
