import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Possible REGEX
// https://www.youtube.com/watch?v=brcHK3P6ChQ
// const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,50}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function PublishInsertion(props) {
    /**
     ** VARIABLES
     */
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        expiration_date: "",
        gathering_location: "",
        image: "",
        reported: false,
    });

    /**
     * Variables for managing the input checks.
     * If formValidation contains only empty strings,
     * everything is ok;
     * otherwise, it contains the message errors to be
     * displayed.
     */
    const [formValidation, setformValidation] = useState({
        title: "",
        expiration_date: "",
    });

    // If redirect is true then redirect to the insertion page
    const [redirect, setRedirect] = useState(false);

    /**
     ** FUNCTIONS
     */

    function handleChange(event) {
        // Get name and value of the changed field
        const { name, value } = event.target;

        // Update formData with the changed value
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    /**
     * Call on submit.
     * It checks the input fields and possibly modifies
     * formValidation values with the respective error messages.
     */
    function validate() {
        const date = new Date();
        // Get the date of today
        const today_str =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
        const today = new Date(today_str);

        // ? Do we want to check also the length of the title?
        // formValidation.title =
        //     formData.title.length < 5
        //         ? "The title must be at least 5 characters long!"
        //         : "";

        // If the expiration_date was inputted
        if (formData.expiration_date) {
            // Convert the string into a Date object
            const expiration_date = new Date(formData.expiration_date);

            formValidation.expiration_date =
                // if expiration_date < today
                expiration_date < today
                    ? // then
                      "The expiration date cannot be in the past!"
                    : // else
                      "";
        }

        // Update formValidation
        setformValidation((prevFormValidation) => {
            return {
                ...prevFormValidation,
            };
        });

        let valid = true;

        /**
         * The inputs are valid if formValidation does not
         * contain error messages (i.e., strings with lengths
         * greater than 0)
         */
        Object.values(formValidation).forEach(
            // if val.length > 0 then valid = false
            (val) => val.length > 0 && (valid = false)
        );

        return valid;
    }

    // On submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // If all the inputs are valid
        if (validate()) {
            await fetch("http://localhost:8000/api/insertions/", {
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

            // If the submission was successful
            setRedirect(true);
        }
    };

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
                    {/* Display error if the condition is not satisfied */}
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
