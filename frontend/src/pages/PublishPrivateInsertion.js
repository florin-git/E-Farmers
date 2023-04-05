import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import axiosInsertions from "../api/axiosInsertions";

// Possible REGEX
// https://www.youtube.com/watch?v=brcHK3P6ChQ
// const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,50}$/;

function PublishPrivateInsertion(props) {
  /**
   ** VARIABLES
   */
  const [searchParams] = useSearchParams();
  const [request, setRequest] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    expiration_date: "",
    gathering_location: "",
    image: "",
    reported: false,
  });
  const [price, setPrice] = useState(0.5);

  /**
   * Variables for managing the input checks.
   * If formValidation contains only empty strings,
   * everything is ok;
   * otherwise, it contains the message errors to be
   * displayed.
   */
  const [formValidation, setformValidation] = useState({
    expiration_date: "",
    price: "",
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
    expiration_date_for_class: "",
    price_for_class: "",
  });

  // This variable is used for the redirection
  const navigate = useNavigate();
  const descriptionRef = useRef();

  // Authentication data from context storage
  const { auth } = useAuth();
  const userId = auth.userId;

  /**
   ** FUNCTIONS
   */

  const getRequest = async () => {
    await axiosInsertions
        .get(`booking/${searchParams.get('request_id', -1)}/`)
        .then((res) => {
        setRequest(res.data);
        })
        .catch((error) => {
        return error.response;
        });
  };

  // When you access the page, the focus will be on the title input
  useEffect(() => {
    getRequest();
    descriptionRef.current.focus();
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

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleImageChange(event) {
    // Get previous data
    let newFormData = { ...formData };
    // Update formData with the changed value
    newFormData["image"] = event.target.files[0];
    setFormData(newFormData);
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
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const today = new Date(today_str);

    // If the expiration_date was inputted
    if (formData.expiration_date) {
      // Convert the string into a Date object
      const expiration_date = new Date(formData.expiration_date);

      // Check date
      if (expiration_date < today) {
        formValidation.expiration_date =
          "The expiration date cannot be in the past!";
        formValidationClass.expiration_date_for_class = "is-invalid";
      } else {
        formValidation.expiration_date = "";

        // If previously you inserted a wrong input
        if (formValidationClass.expiration_date_for_class === "is-invalid")
          formValidationClass.expiration_date_for_class = "is-valid";
      }
    }

    // Check price
    if (price <= 0) {
      formValidation.price = "The price must be greater than 0!";
      formValidationClass.price_for_class = "is-invalid";
    } else {
      formValidation.price = "";

      // If previously you inserted a wrong input
      if (formValidationClass.price_for_class === "is-invalid")
        formValidationClass.price_for_class = "is-valid";
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
      // FormData object for the new insertion
      let form_data = new FormData();

      form_data.append("title", request.title);
      form_data.append("description", formData.description);
      form_data.append("expiration_date", formData.expiration_date);
      form_data.append("gathering_location", formData.gathering_location);
      form_data.append("image", formData.image);
      form_data.append("reported", formData.reported);
      form_data.append("farmer", userId);
      form_data.append("private", true);
      form_data.append("request", request.id);

      /**
       * Create new insertion through API call
       */
      await axiosInsertions
        .post("insertions/", form_data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            let box_data = new FormData();
            box_data.append("insertion", res.data.insertion_id);
            box_data.append("weight", request.weight);
            box_data.append("size", 3);
            box_data.append("price", price);
            box_data.append("number_of_available_boxes", 1);
            axiosInsertions
                .post(`insertions/${res.data.insertion_id}/boxes/`, box_data)
                .then(() => {
                  let request_data = new FormData();
                  request_data.append("id", request.id);
                  request_data.append("insertion", res.data.insertion_id);
                  request_data.append("user", request.user);
                  request_data.append("farmer", request.farmer);
                  request_data.append("title", request.title);
                  request_data.append("comment", request.comment);
                  request_data.append("weight", request.weight);
                  request_data.append("deadline", request.deadline);
                  axiosInsertions
                      .put(`booking/${request.id}/`, request_data);
                  // If the submission was successful
                  navigate("/insertions");
                });
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  return (
    <div className="container-md py-5">
      <h1 className="text-center">{request.title}</h1>
      <hr/>
      <div className="row ">
        <div className="d-flex justify-content-center align-items-center h-100">
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    ref={descriptionRef}
                    placeholder="Description"
                    value={formData.description}
                    name="description"
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group mt-3">
                <label htmlFor="gathering_location">Gathering Location</label>
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

                <div className="form-group mt-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className={`form-control ${formValidationClass.price_for_class}`}
                    id="price"
                    min="0.5"
                    step="0.1"
                    value={price}
                    name="price"
                    onChange={handlePriceChange}
                    required
                  />
                  {formValidation.price.length > 0 && (
                    <span className="invalid-feedback">{formValidation.price}</span>
                  )}
                </div>

                <div className="row">
                <div className="form-group col-lg-6 mt-3">
                    <label htmlFor="expiration_date">Expiration Date</label>
                    <input
                    type="date"
                    className={`form-control ${formValidationClass.expiration_date_for_class}`}
                    id="expiration_date"
                    placeholder="Expiration Date"
                    value={formData.expiration_date}
                    name="expiration_date"
                    onChange={handleChange}
                    required
                    />
                    {formValidation.expiration_date.length > 0 && (
                    <span className="invalid-feedback">
                        {formValidation.expiration_date}
                    </span>
                    )}
                </div>

                <div className="form-group col-lg-6 mt-3">
                    <label htmlFor="image">Image</label>
                    <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="form-control"
                    id="image"
                    placeholder="Image"
                    name="image"
                    onChange={handleImageChange}
                    required
                    />
                </div>
                </div>
                <button className="mt-4 btn btn-primary" type="submit">
                Save
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default PublishPrivateInsertion;
