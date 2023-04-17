import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axiosOrder from "../api/axiosOrder";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import "../my_css/UserFE/RiderProfile.css";
import Button from "@mui/material/Button";
import { faL } from "@fortawesome/free-solid-svg-icons";

function RiderProfile(props) {
  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  const riderUserId = useParams()?.rider_id;

  const [riderInfo, setRiderInfo] = useState([]);
  const [flag, setFlag] = useState();
  const [isDelivering, setIsDelivering] = useState();
  const [riderStatus, setRiderStatus] = useState();

  const handleClick = (event) => {
    const flagNow = !flag;
    setFlag(flagNow);

    axiosPrivate
      .patch(`riders/${riderUserId}/`, {
        available: flagNow,
      })
      .then((res) => {
        setRiderStatus(res.data.available ? "Available" : "Not Available");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleDeliveryCompleted = (event) => {
    axiosPrivate
      .patch(`riders/${riderUserId}/`, {
        available: true,
      })
      .then((res) => {
        setRiderStatus(res.data.available ? "Available" : "Not Available");

        axiosOrder
          .updateStatusRider({ riderUserId })
          .then((res) => {
            console.log("Delivery completed");
            setIsDelivering(false);
          })
          .catch((res) => {
            console.log(res.response);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    (async () => {
      await axiosPrivate
        .get(`riders/${riderUserId}/`)
        .then((res) => {
          setFlag(res.data.available);
          setRiderInfo(res.data);
          setRiderStatus(res.data.available ? "Available" : "Not Available");
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [riderUserId]);

  useEffect(() => {
    (async () => {
      await axiosOrder
        .getSpecificOrderByRider(riderUserId)
        .then((res) => {
          console.log(res.data);
          setIsDelivering(true);
        })
        .catch((error) => {
          setIsDelivering(false);
          console.log(error.response);
        });
    })();
  }, [riderUserId]);

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
                className="rounded-circle"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                alt="Pennello Cinghiale"
              ></img>
            </div>
          </div>

          <div className="mt-5 text-center">
            <h3 className="mb-0">{riderInfo.name}</h3>
            <span className="text-muted d-block mb-2">{riderInfo.bio}</span>
            <span className="text-muted d-block mb-2">
              <h6>STATUS : {riderStatus} </h6>
            </span>
          </div>
          <div className="d-flex flex-column align-items-center">
            {userId == riderUserId && (
              <Button className="btn btn-primary" onClick={handleClick}>
                Change status
              </Button>
            )}

            {userId == riderUserId && isDelivering && (
              <Button
                className="btn btn-primary"
                onClick={handleDeliveryCompleted}
              >
                Delivery Completed
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h1> Keep track of your rider </h1>
        <div className="d-flex justify-content-center align-items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111980.06507131978!2d12.395912256755646!3d41.91024113226929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6191424a7e3b%3A0x6d8c6f0637b52a76!2sRome%2C%20Metropolitan%20City%20of%20Rome%2C%20Italy!5e0!3m2!1sen!2sus!4v1649168672762!5m2!1sen!2sus"
            className="w-100"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default RiderProfile;
