import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axiosUsers from "../api/axiosUsers";
import useAuth from "../hooks/useAuth";

// Import for GUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Registration(props) {
  /**
   ** VARIABLES
   */
  const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const initialFormData = Object.freeze({
    name: "",
    email: "",
    password: "",
    confirmPsw: "",
  });

  // Form
  const [formData, setFormData] = useState(initialFormData);
  // Form Check
  const [validEmail, setValidEmail] = useState(true);
  const [validPsw, setValidPsw] = useState(true);
  const [validMatch, setValidMatch] = useState(true);
  const [flagTOService, setflagTOService] = useState(false);

  // Show Alert Message
  const [showAlert, setShowAlert] = useState(false);
  // Alert Message Context
  const [dataErrorHeader, setDataErrorHeader] = useState("");
  const [dataErrorContext, setDataErrorContext] = useState("");

  // User Reference (AutoLogin)
  const userRef = useRef();
  const { setAuth } = useAuth();

  // Navigation & Redirection
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /***
   *
   * FUNCTION HANDLER
   *
   ***/

  useEffect(() => {
    userRef.current.focus();
  }, []);

  function handleChange(event) {
    // Get name and value of the changed field
    const { name, value } = event.target;
    /**
     * If you are retyping the email,
     * then reset the validation check on the email
     */
    if (name === "email") {
      setValidEmail(true);
    }

    // Update formData with the changed value
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value.trim(),
      };
    });
  }
  // Checks on the password.
  const validate = () => {
    const securePSw = PSW_REGEX.test(formData.password);
    setValidPsw(securePSw);

    const compare = formData.password === formData.confirmPsw;
    setValidMatch(compare);
    return compare && securePSw;
  };

  // On submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!flagTOService) {
      setDataErrorHeader("TermsOfService error");
      setDataErrorContext(" Please check the box of TermsOfService ");
      setShowAlert(true);
    } else {
      if (validate()) {
        axiosUsers
          .post("users/", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            account_type: 0,
          })
          .then(() => {
            // If the submission was successful automatically log in

            axiosUsers
              .post("login/", {
                email: formData.email,
                password: formData.password,
              })
              .then((res) => {
                console.log("AutoLogin");
                let userId = res.data.user_id;
                let accountType = res.data.account_type;

                // Generate JWT Token
                axiosUsers
                  .post("token/", {
                    email: formData.email,
                    password: formData.password,
                  })
                  .then((res) => {
                    // Login successfully
                    const accessToken = res.data.access;
                    localStorage.setItem("refresh_token", res.data.refresh);

                    axiosUsers.defaults.headers[
                      "Authorization"
                    ] = `JWT ${accessToken}`;

                    setAuth({ userId, accountType, accessToken });

                    // If you are a new user, reset the session storage with the Farmers' messages
                    sessionStorage.setItem("msg", "");

                    navigate(from, { replace: true });
                  });
              })
              .catch((error) => {
                return error.response;
              });
            // navigate("/");
          })
          .catch((error) => {
            const response = error.response;
            console.log(response);
            if (
              response.status === 406 &&
              response.statusText === "Not Acceptable"
            ) {
              if (response.data === "Email already used") {
                console.log("Email already used");

                // Set 'validEmail' to false as the email is already used
                setValidEmail(false);
              }
            } else {
              // Handle all other errors
              setDataErrorHeader("A server/network error occurred");
              setDataErrorContext("Double check the input and try again.");
              setShowAlert(true);
            }

            return response;
          });
      }
    }
  };

  return (
    <div className="py-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <Alert
                    variant="danger"
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    <Alert.Heading>{dataErrorHeader}</Alert.Heading>
                    <p>{dataErrorContext}</p>
                  </Alert>

                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign Up
                    </p>

                    {/* Start Form */}
                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-group flex-fill mb-0">
                          <label className="form-label" htmlFor="name">
                            Your Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            ref={userRef}
                            placeholder="Name"
                            value={formData.name}
                            name="name"
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-group flex-fill mb-0">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              !validEmail && "is-invalid"
                            }`}
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            required
                          />
                          <span className="invalid-feedback">
                            Email already used by another user
                          </span>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-group flex-fill mb-0">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              !validPsw && "is-invalid"
                            }`}
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            name="password"
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            required
                          />
                          <p className="invalid-feedback">
                            8 to 24 characters. <br /> Must include uppercase
                            and lowercase letters, a number and a special
                            character.
                            <br /> Allowed special characters: ! @ # $ %
                          </p>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="confirmPsw">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className={`form-control ${
                              !validMatch && "is-invalid"
                            }`}
                            id="confirmPsw"
                            placeholder="Password"
                            value={formData.confirmPsw}
                            name="confirmPsw"
                            onChange={(event) => {
                              handleChange(event);
                            }}
                            required
                          />
                          <span className="invalid-feedback">
                            The two passwords must match!
                          </span>
                        </div>
                      </div>

                      {/* <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-group flex-fill mb-0">
                          <Box sx={{ minWidth: 240 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                AccountType
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={0}
                                label="TypeOfAccount"
                              >
                                <MenuItem value={0}>Customer</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div> */}

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example3c"
                          value={flagTOService}
                          label="TermsOfService"
                          onChange={(event) => {
                            setflagTOService(event.target.value);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
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
export default Registration;
