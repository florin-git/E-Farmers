import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../api/axiosInsertions";

// Possible REGEX
// https://www.youtube.com/watch?v=brcHK3P6ChQ
// const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,50}$/;

function EditInsertion() {
  /**
   ** VARIABLES
   */

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
  });

  // Variable to store the insertion's details
  const [insertion, setInsertion] = useState([]);

  const [formData, setFormData] = useState({
    title: insertion.title,
    description: insertion.description,
    expiration_date: insertion.expiration_date,
    gathering_location: insertion.gathering_location,
    image: insertion.image,
    reported: insertion.reported,
  });

  // True If the URL is associated with an existing insertion
  const [existsURL, setExistsURL] = useState(false);

  // This variable is used for the redirection
  const navigate = useNavigate();
  const titleRef = useRef();

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  /**
   ** FUNCTIONS
   */

  // When you access the page, the focus will be on the title input
  useEffect(() => {
    titleRef.current.focus();

    (async () => {
      await axiosInstance
        .get(`insertions/${insertion_id}/`)
        .then((res) => {
          if(res.status == '204'){
            setExistsURL(false);
            navigate("/");
          }
          else {
            setExistsURL(true);
            setInsertion(res.data);
          }
        })
        .catch((error) => {
          // If insertion does not exists
          console.log(error);
          setExistsURL(false);
          navigate("/");
        });
    })();
  }, [insertion_id, navigate]);

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

      form_data.append("title", formData.title);
      form_data.append("description", formData.description);
      form_data.append("expiration_date", formData.expiration_date);
      form_data.append("gathering_location", formData.gathering_location);
      form_data.append("image", formData.image);
      form_data.append("reported", formData.reported);

      /**
       * Create new insertion through API call
       */
      await axiosInstance
        .put(`insertions/${insertion_id}/`, form_data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          // If the submission was successful
          navigate("/insertions");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  var date = new Date();
  // `/image/?${date.getMinutes()}` in order to avoid caching of the images
  return (
    <div className="container-md py-5">
      <div className="row ">
        <div className="col-lg-6">
          <img
            src={axiosInstance.defaults.baseURL + "insertions/" + insertion_id + `/image/?${date.getMinutes()}`}
            alt="insertion_image"
            className="img-fluid"
          />
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="d-flex justify-content-center align-items-center h-100">
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="title"
                  ref={titleRef}
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
                  <span className="invalid-feedback">{formValidation.title}</span>
                )}
              </div>

              <div className="form-group mt-3">
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
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="form-control"
                  id="image"
                  placeholder="Image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              
              <button className="mt-4 btn btn-primary" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInsertion;