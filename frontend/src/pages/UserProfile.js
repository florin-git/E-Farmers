import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

// Account information to hold for rappresentation
let type;
let element;

function modify_button(type) {
  if (type === 1) {
    document.getElementById("farmer").style.pointerEvents = "none";
  } else if (type === 2)
    document.getElementById("rider").style.pointerEvents = "none";
}

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

  const [userInfo, setUserInfo] = useState([]);
  const [extraInfo, setExtraInfo] = useState([]);

  let accountType = "Customer";

  if (userInfo?.account_type === 0) {
    accountType = "Customer";
  } else if (userInfo?.account_type === 1) {
    accountType = "Farmer";
  } else if (userInfo?.account_type === 2) {
    accountType = "Rider";
  }

  /**
   ** FUNCTIONS
   */

  // LEGENDA =   [ 0 : USER -- 1 : FARMER -- 2 : RIDER ]
        
  const farmerInfo = userInfo.account_type === 1 && (
    <div className="col-6 mb-3">
      <h6>Farm Location</h6>
      <p className="text-muted" id="FarmLocation">
        {" "}
        {extraInfo.farm_location}{" "}
      </p>
      <div>
        <Link className="btn btn-warning" to={`/farmer/profile/${userId}/`} replace >
          My Personal Page
        </Link>
      </div>
    </div>
  );

  const riderInfo = userInfo.account_type === 2 && (
    <div className="col-6 mb-3">
      <h6>Avalaible</h6>
      <p className="text-muted" id="Avalaible">
        {" "}
        {extraInfo.avalaible}{" "}
      </p>
      <div>
        <Link className="btn btn-warning" to={"/rider/profile/"} replace >
          Rider Page
        </Link>
      </div>
    </div>
  );

  useEffect(() => {
    /**
     * Retrieve the user info
     */
    (async () => {
      await axiosPrivate
        .get(`users/${userId}/`)
        .then((res) => {
          /**
           * The result is a list:
           *  the first JSON record contains user's info
           *  the second, IF EXISTS, contains extra info about rider/farmer
           */
          setUserInfo(res.data[0]);

          type = res.data[0].account_type;
          if (type === 1 || type === 2) {
            setExtraInfo(res.data[1]);
            console.log("User speciale ongoing new actions.");
            modify_button(type);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [userId, axiosPrivate, location, navigate]);

  return (
    <div>
      <section>
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
                  <div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                      <Link className="btn btn-primary m-1" to={"orders/"} id="orders" >
                        Orders
                      </Link>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                      <Link className="btn btn-primary m-1 " to={"/"} >
                        Cards
                        </Link>   
                    </div>
                    <div className="row d-flex justify-content-center align-items-center"> 
                    <Link className="btn btn-primary m-1 " to={"/"} >
                        Utils
                      </Link>
                    </div>                                    
                  </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Name</h6>
                          <p className="text-muted" id="name">
                            {userInfo.name}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted" id="email">
                            {userInfo.email}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Phone</h6>
                          <p className="text-muted" id="phone">
                            {userInfo.phone}
                          </p>
                        </div>
                      </div>
                      <h6>Other Information</h6>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>ShippingAddress</h6>
                          <p className="text-muted" id="saddress">
                            {userInfo.saddress}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>BillingAddress</h6>
                          <p className="text-muted" id="baddress">
                            {userInfo.baddress}
                          </p>
                        </div>
                      </div>
                      <h6>Advanced</h6>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>AccountType</h6>
                          <p className="text-muted" id="account_type">
                            {accountType}
                          </p>
                        </div>
                      </div>
                      <h6> Upgrade </h6>
                      <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <div> 
                              <Link className="btn btn-warning" to={"farmer_update/"} id = "farmer" >
                                            Become a Farmer!
                              </Link>
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <div>
                              <Link className="btn btn-warning" to={"rider_update/"} id = "rider" >
                                            Become a Rider!
                              </Link>
                            </div>
                          </div>

                          <div className="col-6 mb-3">
                            <div> 
                              <Link className="btn btn-warning" to={"payments/"} id = "payments" >
                                            Payments Page!
                              </Link>
                            </div>
                          </div>
                      </div> 

                      <div className = "row pt-1" id = "extrainfo">
                        <h6 id="specialInfo">  </h6>
                        {element} 
                      </div>
                      {userInfo.account_type !== 0 && (
                        <div className="row pt-1" id="extrainfo">
                          <div>
                            <div className="col-6 mb-3">
                              <h6>Bio</h6>
                              <p className="text-muted" id="bio">
                                {" "}
                                {extraInfo.bio}{" "}
                              </p>
                            </div>
                            {farmerInfo}
                            {riderInfo}
                          </div>
                        </div>
                      )}
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
/*
{accountUp && (          
  <div className="row pt-1" id="root">
  <h6>Special Information</h6>
    <div className="col-6 mb-3">
      <h6>Bio</h6>
      <p className="text-muted" id="bio"></p>
    </div>
    {type = 1 && (
      <div className="col-6 mb-3">
        <h6>Farm Location</h6>
        <p className="text-muted" id="FarmLocation"></p>
      </div>
    )}
    {type = 2 && (
    <div className="col-6 mb-3">
      <h6>Avalaible</h6>
      <p className="text-muted" id="Avalaible"></p>
    </div>
    )}
  </div>
)}      */
