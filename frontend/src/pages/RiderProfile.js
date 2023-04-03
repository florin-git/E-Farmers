import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import "../my_css/UserFE/RiderProfile.css";
import Button from "@mui/material/Button";

function RiderProfile(props) {
  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  const riderUserId = useParams()?.user_id;
  const [riderInfo, setRiderInfo] = useState([]);
  const [flag, setFlag] = useState(false);
  const [riderStatus,setRiderStatus] = useState();

  const handleClick = (event) => {
    setFlag(!flag);
    axiosPrivate
      .patch(`riders/${userId}/`, {
        /*email : email,
        password : "password",*/
        available: flag,
      })
      .then((res) => {
        console.log(res.data);
        //navigate("/user/profile/")
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    (async () => {
      await axiosPrivate
        .get(`riders/${userId}/`)
        .then((res) => {
          setRiderInfo(res.data);
          setRiderStatus(res.data.available ? "Available" : "Not Available");
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
    
  }, [riderUserId,riderInfo]);
  return (
  <div>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card2">
        <div className="upper">
          <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid" />
        </div>

        <div className="user text-center">
          <div className="profile">
            <img
              src="https://i.imgur.com/JgYD2nQ.jpg"
              className="rounded-circle"
              width="80"
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <h3 className="mb-0">{riderInfo.name}</h3>
          <span className="text-muted d-block mb-2">El salvador</span>
          <span className="text-muted d-block mb-2"><h6>STATUS : {riderStatus} </h6></span>
          <Button
            className="btn btn-primary btn-sm follow"
            onClick={handleClick}
          >
            Change status
          </Button>

          <div className="d-flex justify-content-between align-items-center mt-4 px-4">
            <div className="stats">
              <h6 className="mb-0">Like</h6>
              <span>8,797</span>
            </div>

            <div className="stats">
              <h6 className="mb-0">Completed Delivery</h6>
              <span>142</span>
            </div>

            <div className="stats">
              <h6 className="mb-0">Ranks</h6>
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="text-center">
    <h1> Keep track of your rider </h1>
      <div className="d-flex justify-content-center align-items-center">

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111980.06507131978!2d12.395912256755646!3d41.91024113226929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6191424a7e3b%3A0x6d8c6f0637b52a76!2sRome%2C%20Metropolitan%20City%20of%20Rome%2C%20Italy!5e0!3m2!1sen!2sus!4v1649168672762!5m2!1sen!2sus"
          className="w-100" height="400" allowFullScreen="" loading="lazy"></iframe>
      </div>
    </div>
  </div>
  );
}

export default RiderProfile;
