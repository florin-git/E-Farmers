import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosUsers";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {FormControlLabel,Switch} from "@mui/material";


function RiderUpdate(props) {
  const initialFormData = Object.freeze({
    bio: ""
  });

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;

  const axiosPrivate = useAxiosPrivate();

  // Form
  const [formData, setFormData] = useState(initialFormData);

  // Used to pass it to the post in order to recognize the type of account
  const type = 2
  const navigate = useNavigate();
  

  //set default value to the switch.
  const [checked, setChecked ] = useState(false)
  const onChange = () => {
    setChecked(!checked);
    // console.log(checked)
  };

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
  // Submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      await axiosPrivate
        .post(`users/${userId}/${type}/`, {
          avalaible: false,
          bio: formData.bio
        })
        .then((res) => {
          console.log("Modificare campo Account Type dell'user")
          axiosPrivate
            .post(`token/verify/`, {
              user_id: userId,
            })
            .then(() => {
              axiosInstance
                .patch(`users/${userId}/`, {
                  /*email : email,
                  password : "password",*/
                  account_type: type
                })
                .then((res) => {
                  console.log(res.data)
                  navigate("/user/profile/")
                })
                .catch((error)=> {
                  console.log(error.response);
                });
            })
            .catch((error) => {
              console.log(error.response);
            });
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  };

  return (
    <div>
      <div className="py-5">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">

                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        RIDERRRRRR
                      </p>
                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-group flex-fill mb-0">
                            <label className="form-label" htmlFor="bio">
                              Bio
                            </label>
                            <input
                              type="text"
                              className={`form-control`}
                              id="bio"
                              placeholder="Bio"
                              value={formData.bio}
                              name="bio"
                              onChange={(event) => {
                                handleChange(event);
                              }}
                              required
                            /> 
                          </div>
                        </div>
                        <FormControlLabel control={
                          <Switch disabled
                            checked={checked}
                            onChange={onChange}
                            size = "medium"
                            color= "success"
                          />
                          } 
                            label="Avalaible" 
                          />
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Submit
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

export default RiderUpdate;