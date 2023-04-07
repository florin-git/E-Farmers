import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {FormControlLabel,Switch} from "@mui/material";


const RiderUpdate = (props) => {

  const initialFormData = Object.freeze({
    bio: ""
  });

  // Authentication data from context storage
  const { auth, setAuth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  // Form
  const [formData, setFormData] = useState(initialFormData);
  const [flagForm, setFlagForm] = useState(false);

  // Used to pass it to the post in order to recognize the type of account
  const type = 2
  //const navigate = useNavigate();
  

  //set default value to the switch.
  const [checked, setChecked ] = useState(false)
  const onChange = () => {
    setChecked(!checked);
    // console.log(checked)
  };

  function handleChange(event) {
    //just a flag to avoid save changes with blank space
    if(!flagForm)
      setFlagForm(true)

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

  const validateInput = () => {
    if (!flagForm)
      return false;
    else{
      /* Controllo sull'input */
      return true;
    }
  };

  useEffect(() => {
    if ( props.trigger ){
      console.log("Child Trigger : ", props.trigger)
      handleSubmit()
    }
  }, [props.trigger]);
  

  // Submit event
  const handleSubmit = (event) => {
    if(validateInput()){
      (async () => {
        await axiosPrivate
          .post(`users/${userId}/${type}/`, {
            available: false,
            bio: formData.bio
          })
          .then((res) => {
            console.log(res)
            axiosPrivate
              .post(`token/verify/`, {
                user_id: userId,
              })
              .then(() => {
                axiosPrivate
                  .patch(`users/${userId}/`, {
                    /*email : email,
                    password : "password",*/
                    account_type: type
                  })
                  .then((res) => {
                    console.log(res.data)
                    props.parentFunction(flagForm);

                    setAuth((prev) => {
                      return {
                        ...prev,
                        accountType: type
                      };
                    });

                    //navigate("/user/profile/")
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
    }else{
      props.parentFunction();
    }
  };

  return (
    <div>
        <div className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        Form For Rider
        </div>
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
            label="available" 
            />

        {/*
        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-primary btn-lg" onclick={handleSubmit} >
            Confirm
          </button>
        </div>
              */}
        </form>
    </div>
  );
}

export default RiderUpdate;
