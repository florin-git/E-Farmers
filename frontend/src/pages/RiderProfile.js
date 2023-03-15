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
  const [status, setStatus] = useState("");

  const [flag, setFlag] = useState(false);

  const handleClick = (event) => {
    setFlag(!flag);
    axiosPrivate
      .patch(`riders/${userId}/`, {
        /*email : email,
        password : "password",*/
        avalaible: flag,
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
          if (riderInfo.avalaible) setStatus("Not Avalaible");
          else setStatus("Avalaible");
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [riderUserId, flag]);

  return (
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
          <h4 className="mb-0">{riderInfo.name}</h4>
          <span className="text-muted d-block mb-2">El salvador</span>
          <span className="text-muted d-block mb-2">STATUS : {status} </span>
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
  );
}

export default RiderProfile;
