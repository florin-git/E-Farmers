import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

function AddBoxes(props) {
    const [formData, setFormData] = useState({
        weight: 0,
        size: "",
        price: 0.0,
        number_of_available_boxes: 0,
    });

    const [formValidation, setformValidation] = useState({
        weight: "",
        size: "",
        price: "",
        // number_of_available_boxes: 0,
    });

    const [redirect, setRedirect] = useState(false);
    const { insertion_id } = useParams();

    const [boxes, setBoxes] = useState([]);

    
    // Retrieve Boxes of the insertion
    useEffect(() => {
        (async () => {
            /* 
                Because the 'await' keyword, the asynchronous
                function is paused until the request completes. 
                */
            const response = await fetch(
                `http://localhost:8000/api/insertions/${insertion_id}/boxes`
            );
            const data = await response.json();

            setBoxes(data);
        })();
    }, []);

    
    // Manage the presence of particular size
    // You can add only sizes that are not alredy present
    const sizes = [0, 1, 2];
    let not_available = [];

    boxes.map((box) => not_available.push(box.size));
    // console.log("NOT:" + not_available)
    // Remove from sizes elements present in 'not_available'
    const available = sizes.filter((item) => !not_available.includes(item));


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }


    function validate() {
        formValidation.weight =
            // if weight <= 0
            formData.weight <= 0 ? "The weight must be greater than 0 kg!" : "";

        formValidation.price =
            // if price <= 0
            formData.price <= 0 ? "The price must be greater than 0!" : "";

        formValidation.size = 
            formData.size === "" ? "You must choose the size!" : "" 


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

        return valid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            try {
                await fetch(
                    `http://localhost:8000/api/insertions/${insertion_id}/boxes`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            insertion: insertion_id,
                            weight: formData.weight,
                            size: formData.size,
                            price: formData.price,
                            number_of_available_boxes:
                                formData.number_of_available_boxes,
                        }),
                    }
                );

                // If the submit is successfull
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
        }
    };
    // console.log(formData)

    if (redirect) {
        return <Navigate replace to={`../insertions/${insertion_id}`} />;
    }

    return (
        <div className="container-md">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="weight">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="title"
                        min="0.00"
                        step="0.1"
                        value={formData.weight}
                        name="weight"
                        onChange={handleChange}
                        required
                    />
                    {formValidation.weight.length > 0 && (
                        <span className="error">{formValidation.weight}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <select
                        className="form-select"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                    >
                        <option value="">--Choose--</option>
                        {available.includes(0) && <option value="0">Small</option>}
                        {available.includes(1) && <option value="1">Medium</option>}
                        {available.includes(2) && <option value="2">Large</option>}
                    </select>
                    {formValidation.size.length > 0 && (
                        <span className="error">{formValidation.size}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        min="0.00"
                        step="0.1"
                        value={formData.price}
                        name="price"
                        onChange={handleChange}
                        required
                    />
                    {formValidation.price.length > 0 && (
                        <span className="error">{formValidation.price}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="number_of_available_boxes">
                        Number of Available Boxes
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="number_of_available_boxes"
                        min="0"
                        value={formData.number_of_available_boxes}
                        name="number_of_available_boxes"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddBoxes;
