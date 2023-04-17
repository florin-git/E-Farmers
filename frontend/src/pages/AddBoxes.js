import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInsertions";

function AddBoxes(props) {
  /**
   ** VARIABLES
   */
  const [formData, setFormData] = useState({
    weight: 0,
    size: "",
    price: 0.5,
    number_of_available_boxes: 0,
  });

  /**
   * Variables for managing the input checks.
   * If formValidation contains only empty strings,
   * everything is ok;
   * otherwise, it contains the message errors to be
   * displayed.
   */
  const [formValidation, setformValidation] = useState({
    weight: "",
    size: "",
    price: "",
    // number_of_available_boxes: "",
  });

  /**
   * Variables for managing the presence of 'valid'
   * class for inputs.
   * The strings could be:
   * - 'is-invalid' when you want to show the validation msg.
   * - 'is-valid' when you insert the correct input after the wrong one.
   * - empty string if the input is ok from the beginning.
   */
  const [formValidationClass, setformValidationClass] = useState({
    weight_for_class: "",
    size_for_class: "",
    price_for_class: "",
  });

  const [boxes, setBoxes] = useState([]);

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  // This variable is used for the redirection
  const navigate = useNavigate();

  const weightRef = useRef();

  /**
   ** FUNCTIONS
   */

  // When you access the page, the focus will be on the title input
  useEffect(() => {
    weightRef.current.focus();
  }, []);

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
   * Retrieve the boxes of this insertion from backend.
   * This is done to get the box sizes, because we do not want
   * to display sizes that are already present.
   *
   * Ex.
   * If the insertion already contains a "small" box,
   * then the user cannot insert another "small" box,
   * but he should modify the existing one.
   */
  useEffect(() => {
    (async () => {
      await axiosInstance
        .get(`insertions/${insertion_id}/boxes/`)
        .then((res) => {
          setBoxes(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    })();
  }, [insertion_id]);

  /**
   * Manage the presence of particular sizes.
   * You can add only sizes that are not already present
   */
  const sizes = [0, 1, 2]; // Possible sizes
  let not_available = [];

  // Add to not_available the sizes of the boxes of this insertion
  boxes.map((box) => not_available.push(box.size));

  // Remove from sizes the elements present in not_available
  const available = sizes.filter((item) => !not_available.includes(item));

  /**
   * Call on submit.
   * It checks the input fields and possibly modifies
   * formValidation values with the respective error messages.
   */
  function validate() {
    // Check weight
    if (formData.weight <= 0) {
      formValidation.weight = "The weight must be greater than 0 kg!";
      formValidationClass.weight_for_class = "is-invalid";
    } else {
      formValidation.weight = "";

      // If previously you inserted a wrong input
      if (formValidationClass.weight_for_class === "is-invalid")
        formValidationClass.weight_for_class = "is-valid";
    }

    // Check price
    if (formData.price <= 0) {
      formValidation.price = "The price must be greater than 0!";
      formValidationClass.price_for_class = "is-invalid";
    } else {
      formValidation.price = "";

      // If previously you inserted a wrong input
      if (formValidationClass.price_for_class === "is-invalid")
        formValidationClass.price_for_class = "is-valid";
    }

    // Check size
    if (formData.size === "") {
      formValidation.size = "You must choose the size!";
      formValidationClass.size_for_class = "is-invalid";
    } else {
      formValidation.size = "";

      // If previously you inserted a wrong input
      if (formValidationClass.size_for_class === "is-invalid")
        formValidationClass.size_for_class = "is-valid";
    }

    // Update formValidation
    setformValidation((prevFormValidation) => {
      return {
        ...prevFormValidation,
      };
    });

    // Update formValidationClass
    setformValidationClass((prevFormValidationClass) => {
      return {
        ...prevFormValidationClass,
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
      // FormData object for the new box
      let form_data = new FormData();

      form_data.append("insertion", insertion_id);
      form_data.append("weight", formData.weight);
      form_data.append("size", formData.size);
      form_data.append("price", formData.price);
      form_data.append(
        "number_of_available_boxes",
        formData.number_of_available_boxes
      );

      /**
       * Create new box through API call
       */
      await axiosInstance
        .post(`insertions/${insertion_id}/boxes/`, form_data)
        .then(() => {
          // If the submission was successful
          axiosInstance.put(`insertions/${insertion_id}/increase`).then((res) => console.log('INCREASED'))
          navigate(`/insertions/${insertion_id}`);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div>
      <h1 className="text-center">Add Boxes</h1>
      <hr />
      <div className="container-md d-flex justify-content-center py-5">
        <div className="w-25">
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                className={`form-control ${formValidationClass.weight_for_class}`}
                id="weight"
                ref={weightRef}
                min="0.0000"
                step="0.001"
                value={formData.weight}
                name="weight"
                onChange={handleChange}
                required
              />
              {formValidation.weight.length > 0 && (
                <span className="invalid-feedback">
                  {formValidation.weight}
                </span>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="size">Size</label>
              <select
                className={`form-control ${formValidationClass.size_for_class}`}
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
                <span className="invalid-feedback">{formValidation.size}</span>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className={`form-control ${formValidationClass.price_for_class}`}
                id="price"
                min="0.5"
                step="0.1"
                value={formData.price}
                name="price"
                onChange={handleChange}
                required
              />
              {formValidation.price.length > 0 && (
                <span className="invalid-feedback">{formValidation.price}</span>
              )}
            </div>

            <div className="form-group mt-3">
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

            <button className="mt-4 btn btn-primary" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBoxes;
