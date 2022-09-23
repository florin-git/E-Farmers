import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function UserProfile(props) {
  /**
   ** VARIABLES
   */

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;

  // axios function with JWT tokens
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve the user info
     */
    (async () => {
      await axiosPrivate
        .get(`users/${userId}/`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response);
          console.log("LOGIN AGAIN")
          // If also the refresh token expires then you have to
          // log in again
          navigate("login/", { state: { from: location }, replace: true });
        });
    })();

  }, [userId, axiosPrivate, location, navigate]);

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3">
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    // style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      width="80px;"
                    />
                    <h5>Marie Horwitz</h5>
                    <p>Web Designer</p>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      {/* <hr className="mt-0 mb-4"> */}
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">info@example.com</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted">123 456 789</p>
                        </div>
                      </div>
                      <h6>Projects</h6>
                      {/* <hr className="mt-0 mb-4"> */}
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Recent</h6>
                          <p className="text-muted">Lorem ipsum</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Most Viewed</h6>
                          <p className="text-muted">Dolor sit amet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
