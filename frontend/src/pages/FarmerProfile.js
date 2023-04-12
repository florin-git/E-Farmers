import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit } from "@fortawesome/free-solid-svg-icons";

import ListInsertions from "../components/ListInsertions";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axiosSubscription from "../api/axiosSubscription";

import useAuth from "../hooks/useAuth";

import "../my_css/UserFE/FarmerProfile.css";

const star = <FontAwesomeIcon icon={faStar} style={{ color: "#28a745" }} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

function FarmerProfile(props) {
  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;
  const axiosPrivate = useAxiosPrivate();

  // Retrieve the id from the URL
  const farmerUserId = useParams()?.farmer_id;
  const [farmerInfo, setFarmerInfo] = useState([]);

  //Review information
  const [review , setReview] = useState([]);

  let two_yrs_ago =  new Date(new Date().setFullYear(new Date().getFullYear() - 2));

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve the farmer's info
     */
    (async () => {
      await axiosPrivate
        .get(`farmers/${farmerUserId}/`)
        .then((res) => {
          setFarmerInfo(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
        await axiosPrivate
        .get(`review/${userId}/`)
        .then((res) => {
          setReview(res.data);
          console.log(res.data)
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [farmerUserId]);

  const handleSubscribe = (event) => {
    axiosSubscription
      .put(`customer/${userId}/`, {
        farmer_id: farmerUserId,
      })
      .then((res) => {
        alert(`You are now subscribed to ${farmerInfo.name}!`);
        console.log("You are subscribed");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round">
              <a href="" class="disabled-link" >
                <img
                  className="rounded-circle"
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  alt="Pennello Cinghiale"
                ></img> 
              </a>
              <h1>{farmerInfo.name}</h1>
              <p>{farmerInfo.email}</p>
            </div>

            <div className="nav-pills nav-stacked">
              <div className="active text-center mt-3">
                {/* <a href="#">
                  {" "}
                  <i className="fa fa-user"></i> Subscribe
                </a> */}
                <button
                  type="button"
                  // id={insertion.id}
                  name="delete"
                  onClick={(event) => handleSubscribe(event)}
                  className="btn btn-outline-warning"
                >
                  Subscribe
                </button>
              </div>
              {/* <li>
                <Link className="" to={"/insertions/new/"} replace>
                  <i className="fa fa-edit"></i>
                  Publish an Insertion
                  <span className="label label-warning pull-right r-activity"></span>
                </Link>
              </li>
              <li>
                <a href="#"> {edit} Edit Insertions </a>
              </li> */}
              <hr/>
              <div className="row">
                <div className="col">
                  {farmerInfo.number_insertions >= 100 && (
                      <img
                        src={process.env.PUBLIC_URL+'/images/badge_insertions.jpg'}
                        className="img-fluid"
                        alt="fresh"
                      />
                  )}
                  {farmerInfo.number_insertions < 100 && (
                      <img
                        src={process.env.PUBLIC_URL+'/images/badge_not_yet.jpg'}
                        className="img-fluid"
                        alt="fresh"
                      />
                  )}
                </div>
                <div className="col">
                  {farmerInfo.since <= two_yrs_ago.toISOString().split('T')[0] && (
                      <div className="col">
                        <img
                          src={process.env.PUBLIC_URL+'/images/badge_years.jpg'}
                          className="img-fluid"
                          alt="fresh"
                        />
                      </div>
                  )}
                  {farmerInfo.since > two_yrs_ago.toISOString().split('T')[0] && (
                      <img
                        src={process.env.PUBLIC_URL+'/images/badge_not_yet.jpg'}
                        className="img-fluid"
                        alt="fresh"
                      />
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="content text-center">
                  <div className="ratings">
                    <span className="product-rating">4.6</span>
                    <span>/5</span>
                    <div className="stars">
                      {star}
                      {star}
                      {star}
                      {star}
                      {star}
                    </div>
                    <div className="rating-text">
                      <span>46 ratings & 15 reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-info col-md-9">
          <div className="panel">
            <div className="bio-graph-heading">
              {farmerInfo.bio}
            </div>
            <div className="panel-body bio-graph-info">
              <div className="row">
                  <h1>Bio Graph</h1>
              </div>
              <div className="row">
                <div className="bio-row">
                  <p>
                    <span>Name </span>: {farmerInfo.name}
                  </p>
                </div>
                <div className="bio-row">
                  <p>
                    <span>Last Name </span>: {farmerInfo.last_name}
                  </p>
                </div>
                <div className="bio-row">
                  <p>
                    <span>Farm Location </span>: {farmerInfo.farm_location}
                  </p>
                </div>
                <div className="bio-row">
                  <p>
                    <span>Mobile </span>: {farmerInfo.phone_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Insertions</h5>
                </div>
                <ListInsertions farmerUserId={farmerUserId} />
              </div>

            </div>
            <div className="card3">
              <div className="row">
                <div className="col-8">
                  <div className="comment-box ml-2">
                    <h4>Add a comment</h4>
                    
                    <div class="col-md-8">
                      <div class="media g-mb-30 media-comment">
                          <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Image Description"/>
                            <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                              <div class="g-mb-15">
                                <h5 class="h5 g-color-gray-dark-v1 mb-0">John Doe</h5>
                                  <span class="g-color-gray-dark-v4 g-font-size-12">{review.rating}</span>
                              </div>
                            
                          <p> {review.comment}</p>
 
                    </div>
                </div>
            </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
