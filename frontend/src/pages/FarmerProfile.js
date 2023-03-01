import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit } from "@fortawesome/free-solid-svg-icons";

import axiosInstance from "../api/axiosUsers";

import "../my_css/UserFE/FarmerProfile.css";

const star = <FontAwesomeIcon icon={faStar} style={{ color: "#28a745" }} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

function FarmerProfile(props) {
  // Retrieve the id from the URL
  const { farmer_id } = useParams();

  const [farmerInfo, setFarmerInfo] = useState([]);

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve the boxes of this insertion from backend
     */
    (async () => {
      await axiosInstance
        .get(`farmers/${farmer_id}/`)
        .then((res) => {
          setFarmerInfo(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [farmer_id]);

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round">
              <a href="#">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                  alt=""
                />
              </a>
              <h1>{farmerInfo.name}</h1>
              <p>{farmerInfo.email}</p>
            </div>

            <ul className="nav-pills nav-stacked">
              <li className="active">
                <a href="#">
                  {" "}
                  <i className="fa fa-user"></i> Profile
                </a>
              </li>
              <li>
                <Link className="" to={"/insertions/new/"} replace>
                  <i className="fa fa-edit"></i>
                  Publish an Insertion
                  <span className="label label-warning pull-right r-activity"></span>
                </Link>
              </li>
              <li>
                <a href="#"> {edit} Edit Insertions </a>
              </li>
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
            </ul>
          </div>
        </div>
        <div className="profile-info col-md-9">
          <div className="panel">
            <div className="bio-graph-heading">{farmerInfo.bio}</div>
            <div className="panel-body bio-graph-info">
              <h1> </h1>
              <h1>Bio Graph</h1>
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
                  <h5 className="mb-0">Recent Products</h5>
                  <a href="#" className="btn btn-link text-muted">
                    Show all
                  </a>
                </div>
                <div className="row">
                  <div className="col-lg-6 mb-2 pr-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 mb-2 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 pr-lg-1 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div className="col-lg-6 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/*              <div className="col-md-6">
                  <div className="panel">
                      <div className="panel-body">
                          <div className="bio-chart">
                              <div style={{display:"inline",width:"100px",height:"100px"}}>
                                <canvas width="100" height="100px"></canvas>
                                  METTERE COUNTER
                              </div>
                          </div>
                          <div className="bio-desk">
                              <h4 className="purple">Adobe Muse Template</h4>
                              <p>Started : 15 July</p>
                              <p>Deadline : 15 August</p>
                          </div>
                      </div>
                  </div>
              </div>*/}
            </div>
            <div className="card3">
              <div className="row">
                <div className="col-2">
                  <img
                    src="https://i.imgur.com/xELPaag.jpg"
                    width="70"
                    className="rounded-circle mt-2"
                    alt="logo"
                  />
                </div>
                <div className="col-10">
                  <div className="comment-box ml-2">
                    <h4>Add a comment</h4>
                    <div className="rating">
                      <input type="radio" name="rating" value="5" id="5" />
                      <label htmlFor="5">☆</label>
                      <input type="radio" name="rating" value="4" id="4" />
                      <label htmlFor="4">☆</label>
                      <input type="radio" name="rating" value="3" id="3" />
                      <label htmlFor="3">☆</label>
                      <input type="radio" name="rating" value="2" id="2" />
                      <label htmlFor="2">☆</label>
                      <input type="radio" name="rating" value="1" id="1" />
                      <label htmlFor="1">☆</label>
                    </div>

                    <div className="comment-area">
                      <textarea
                        className="form-control"
                        placeholder="what is your view?"
                        rows="4"
                      ></textarea>
                    </div>

                    <div className="comment-btns mt-2">
                      <div className="row">
                        <div className="col-6">
                          <div className="pull-left">
                            <button className="btn btn-success btn-sm">
                              Cancel
                            </button>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="pull-right">
                            <button className="btn btn-success send btn-sm">
                              Send{" "}
                              <i className="fa fa-long-arrow-right ml-1"></i>
                            </button>
                          </div>
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
