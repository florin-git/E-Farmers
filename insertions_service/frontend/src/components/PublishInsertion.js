import React, { useRef } from "react";
import { useState } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Routes, Route, Navigate } from "react-router-dom";
import Insertions from "./Insertions";
const URL = "http://localhost:8000/api/insertions/"

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

    const [redirect, setRedirect] = useState(false);

    /* 
    useRef Hook allows you to persist values between renders.
    It can be used to store a mutable value that does not cause 
    a re-render when updated.
    */

    const titleRef = useRef();
    const errRef = useRef();

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
    // console.log(formData.description)

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(URL, {
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
            // const data = await response.json();
            // console.log(data)
            // If the submit is successfull
            setRedirect(true);
        
        } 
        catch (err) {
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

    if (redirect) {
        return <Navigate replace to="../insertions" />
    }

    return (
        <div className="container-md">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control is-valid"
                        id="title"
                        placeholder="Title"
                        value={formData.title}
                        name="title"
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control is-valid"
                        id="description"
                        placeholder="Description"
                        value={formData.description}
                        name="description"
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="form-group">
                    <label htmlFor="expiration_date">Expiration Date</label>
                    <input
                        type="date"
                        className="form-control is-valid"
                        id="expiration_date"
                        placeholder="Expiration Date"
                        value={formData.expiration_date}
                        name="expiration_date"
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="form-group">
                    <label htmlFor="gathering_location">
                        Gathering Location
                    </label>
                    <input
                        type="text"
                        className="form-control is-valid"
                        id="gathering_location"
                        placeholder="Gathering Location"
                        value={formData.gathering_location}
                        name="gathering_location"
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">
                        Image
                    </label>
                    <input
                        type="text"
                        className="form-control is-valid"
                        id="image"
                        placeholder="Image"
                        value={formData.image}
                        name="image"
                        onChange={handleChange}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>

                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default PublishInsertion;
