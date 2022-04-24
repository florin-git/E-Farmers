import React from "react";
import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";

function AddBoxes(props) {
    const [formData, setFormData] = useState({
        weight: 0,
        size: "0",
        price: 0.0,
        number_of_available_boxes: 0,
    });

    const [redirect, setRedirect] = useState(false);
    const { insertion_id } = useParams();

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await fetch(`http://localhost:8000/api/insertions/${insertion_id}/boxes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    insertion: insertion_id,
                    weight: formData.weight,
                    size: formData.size,
                    price: formData.price,
                    number_of_available_boxes: formData.number_of_available_boxes
                }),
            });

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
    // console.log(formData)

    if (redirect) {
        return <Navigate replace to={`../insertions/${insertion_id}`} />
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
                        min="0.01"
                        step="0.1"
                        value={formData.weight}
                        name="weight"
                        onChange={handleChange}
                        required
                    />
      
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
                        {/* <option value="">--Choose--</option> */}
                        <option value="0">Small</option>
                        <option value="1">Medium</option>
                        <option value="2">Large</option>
                    </select>
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
                    <div className="valid-feedback">Looks good!</div>
                </div>

                <div className="form-group">
                    <label htmlFor="number_of_available_boxes">Number of Available Boxes</label>
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
