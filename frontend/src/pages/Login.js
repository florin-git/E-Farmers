import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../axiosUsers";
import useAuth from "../hooks/useAuth";

function Login(props) {
  /**
   ** VARIABLES
   */

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  // This variable is used for the redirection
  const navigate = useNavigate();

  const location = useLocation();
  // Where you came from when you try to access a "protected" page
  // otherwise the root
  const from = location.state?.from?.pathname || "/";

  // Authentication data from context storage 
  const { setAuth } = useAuth();

  /**
   ** FUNCTIONS
   */

  function handleChange(event) {
    // Get name and value of the changed field
    const { name, value } = event.target;

    // Update formData with the changed value
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value.trim(),
      };
    });
  }

  // On submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the credentials are correct
    axiosInstance
      .post("login/", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log("Login", res.data.user_id);
        const userId = res.data.user_id;
        const accountType = res.data.account_type;

        // console.log(res.data)

        // Generate the JWT token
        axiosInstance
          .post("token/", {
            email: formData.email,
            password: formData.password,
          })
          .then((res) => {

            // If the submission was successful
            const accessToken = res.data.access;
            const refreshToken = res.data.refresh;

            // Set data from backend in the global context
            setAuth({ userId, accountType, accessToken, refreshToken });


            // Update axiosInstance with the new tokens
            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + accessToken;

            // If no errors
            navigate(from, { replace: true });
          })
          .catch((error) => {
            // Erro in fetching the JWT tokens
            console.log(error.response);
            return error.response;
          });
      })
      .catch((error) => {
        // Error with credentials
        const response = error.response;
        if (response.status === 401 && response.statusText === "Unauthorized") {
          if (response.data.detail === "User not found")
            console.log("User not found");
          else if (response.data.detail === "Incorrect Password")
            console.log("Incorrect Password");
        }

        return response;
      });
  };

  return (
    <div>
      <div className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>

                      {/* Start Form */}
                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              value={formData.email}
                              name="email"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              value={formData.password}
                              name="password"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
