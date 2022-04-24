import React, { useRef } from "react";
import { useState } from "react";
// import {
//     faCheck,
//     faTimes,
//     faInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Form from "react-bootstrap/Form";
// import Feedback from "react-bootstrap/Feedback";


import { Routes, Route, Navigate } from "react-router-dom";
const URL = "http://localhost:8000/api/insertions/";

// At leat 3 characters
const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,50}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function PublishInsertion(props) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        expiration_date: "",
        gathering_location: "",
        image: "",
        reported: false,
    });

    const [formValidation, setformValidation] = useState({
        title: "",
        expiration_date: "",
    });

    const [redirect, setRedirect] = useState(false);


    // https://www.youtube.com/watch?v=brcHK3P6ChQ

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    // Call on submit
    // Check the fields and write formValidation
    // elements when one of them contains errors
    function validate() {
        const date = new Date();
        const today_str =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        const today = new Date(today_str);


        // If we want to force a larger input
        // formValidation.title =
        //     // if len < 5
        //     formData.title.length < 5
        //         ? "The title must be at least 5 characters long!"
        //         : "";

        if (formData.expiration_date) {
            const expiration_date = new Date(formData.expiration_date);
            formValidation.expiration_date =
                // if expiration_date < today
                expiration_date < today
                    ? // then
                      "The expiration date cannot be in the past!"
                    : // else
                      "";
        }

        setformValidation((prevFormValidation) => {
            return {
                ...prevFormValidation,
            };
        });

        let valid = true;

        Object.values(formValidation).forEach(
            // if val.length > 0 then valid = false
            (val) => val.length > 0 && (valid = false)
        );

        return valid
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {

            try {
                await fetch(URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        expiration_date: formData.expiration_date,
                        gathering_location: formData.gathering_location,
                        image: formData.image,
                        reported: formData.reported,
                    }),
                });

                // If the submission was successfull
                setRedirect(true);

            } catch (err) {
                /*
                ?. is the optional chaining operator.
                It is usefull because React automatically checks if
                the attribute is null or undefined without raising
                an exception if that field does not exist
                */
                // if (!err?.response) {
                //     setErrMsg("No Server Response");
                // }
                // else {
                // }
            }
        };
 
    }

    if (redirect) {
        return <Navigate replace to="../insertions" />;
    }


    return (
        <div className="container-md">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                        value={formData.title}
                        name="title"
                        onChange={(event) => {
                            handleChange(event);
                        }}
                        required
                    />
                    {formValidation.title.length > 0 && (
                        <span className="error">{formValidation.title}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        value={formData.description}
                        name="description"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expiration_date">Expiration Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="expiration_date"
                        placeholder="Expiration Date"
                        value={formData.expiration_date}
                        name="expiration_date"
                        onChange={handleChange}
                        required
                    />
                    {formValidation.expiration_date.length > 0 && (
                        <span className="error">
                            {formValidation.expiration_date}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="gathering_location">
                        Gathering Location
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="gathering_location"
                        placeholder="Gathering Location"
                        value={formData.gathering_location}
                        name="gathering_location"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        placeholder="Image"
                        value={formData.image}
                        name="image"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default PublishInsertion;
