import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../my_css/UserFE/UserProfile.css"

import useAxiosPrivate from "../hooks/useAxiosPrivate";

//Just for UI
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

const UserChanges = (props) => {
    // Way to pass props by navigate and location
    const { state } = useLocation();
    const { userInfo , extraInfo } = state;
    const user_id = userInfo.id
    const axiosPrivate = useAxiosPrivate();

    const location = useLocation()
    const navigate = useNavigate()

    //Define variable for the form
    const initialFormData = Object.freeze({
        name: userInfo.name,
        account_type: userInfo.account_type,
        shipping: userInfo.shipping_address,
        billing: userInfo.billing_address,
        phone: userInfo.phone_number,
        email: userInfo.email,
        bio: extraInfo.bio,
        available: extraInfo.available,
        farm_location: extraInfo.farm_location,
    });
    const [formData, setFormData] = useState(initialFormData);

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

    // Handle form submission.
    const handleSubmit = async (event) => {
            (async () => {
            await axiosPrivate
                .patch(`users/${user_id}/changes/`, {
                    //data : userInfo controllare guarda le print sul db
                    name: formData.name,
                    email: userInfo.email,
                    account_type: userInfo.account_type,
                    billing_address: formData.billing,
                    shipping_address: formData.shipping,
                    phone_number: formData.phone,
                    bio: formData.bio,
                    farm_location: formData.farm_location,
                })
                .then((res) => {
                    handleExit()
                })
                .catch((error) => {
                    console.log(error.response);
                });
            })();
    };
    const handleExit = (event) => {
        console.log("Handle Exit")
        const from_url = location.state?.from?.pathname || "/user/profile/"
        navigate(from_url)
    };
    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                    <h3>User Profile</h3>
                    <p className="blue-text">Edit your profile<br/> Please complete your profile .</p>
                    <div className="card_3">
                        <h5 className="text-center mb-4">Actual Changes</h5>
                        <form className="form-card" >
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-3">Name
                                    <span className="text-danger"> *</span></label> 
                                    <input type="text" id="name" name="name" placeholder={userInfo.name} onChange={(event) => { handleChange(event); }}/> 
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex"> 
                                    <label className="form-control-label px-3">Email
                                    <span className="text-danger"> *Can't be changed</span></label> 
                                    <input type="text" readOnly='readonly' placeholder={userInfo.email} onChange={(event) => { handleChange(event); }}/> 
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"> 
                                    <label className="form-control-label px-3">Shipping Address
                                    <span className="text-danger"> *</span></label> 
                                    <input type="text" id="shipping" name="shipping" placeholder={userInfo.shipping_address}  onChange={(event) => { handleChange(event); }}/> 
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex"> 
                                    <label className="form-control-label px-3">Billing Address
                                    <span className="text-danger"> *</span></label> 
                                    <input type="text" id="billing" name="billing" placeholder={userInfo.billing_address} onChange={(event) => { handleChange(event); }}/> 
                                </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"> 
                                    <label className="form-control-label px-3">Phone Number
                                    <span className="text-danger"> *</span></label> 
                                    <input type="text" id="phone" name="phone" placeholder={userInfo.phone_number} onChange={(event) => { handleChange(event); }}/>
                                </div>
                            </div>
                            {initialFormData.account_type == 1 && (
                                <div>
                                    <h5 className="text-center mb-4">Additional Information</h5>    
                                    <h3> Farmer </h3>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex"> 
                                            <label className="form-control-label px-3">Bio
                                            <span className="text-danger"> *</span></label> 
                                            <input type="text" id="bio" name="bio" placeholder={extraInfo.bio} onChange={(event) => { handleChange(event); }}/>
                                        </div>
                                        <div className="form-group col-sm-6 flex-column d-flex"> 
                                            <label className="form-control-label px-3">Farm Location
                                            <span className="text-danger"> *</span></label> 
                                            <input type="text" id="farm_location" name="farm_location" placeholder={extraInfo.farm_location} onChange={(event) => { handleChange(event); }}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {initialFormData.account_type == 2 && (
                                <div>
                                    <h3> Rider </h3>
                                    <div className="row justify-content-between text-left">
                                        <div className="form-group col-sm-6 flex-column d-flex"> 
                                            <label className="form-control-label px-3">Bio
                                            <span className="text-danger"> *</span></label> 
                                            <input type="text" id="bio" name="bio" placeholder={extraInfo.bio} onChange={(event) => { handleChange(event); }}/>
                                        </div>
                                    </div>
                                </div>
                                
                            )}
                            <div className="row justify-content">
                                <div className="form-group col-sm-6"> 
                                    
                                    <Stack direction="row" spacing={2}>
                                        <IconButton aria-label="save" onClick={handleSubmit} >
                                            <SaveIcon /> 
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={handleExit} >
                                            <CancelIcon /> 
                                        </IconButton>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  );
};
export default UserChanges;
