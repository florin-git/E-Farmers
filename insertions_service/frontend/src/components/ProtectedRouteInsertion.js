import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InsertionDetail from "./InsertionDetail";

function ProtectedRouteInsertion() {
  /**
   ** VARIABLES
   */

  // Variable to store the insertion's details
  const [insertion, setInsertion] = useState([]);

  // True If the URL is associated with an existing insertion
  const [existsURL, setExistsURL] = useState(false);

  // Retrieve the id from the URL
  const { insertion_id } = useParams();

  // This variable is used for the redirection
  const navigate = useNavigate();

  /**
   ** FUNCTIONS
   */

  useEffect(() => {
    /**
     * Retrieve insertion from backend
     */
    (async () => {
      /* 
        Because the 'await' keyword, the asynchronous
        function is paused until the request completes. 
      */

      const response = await fetch(
        `http://localhost:8000/api/insertions/${insertion_id}`
      );

      // If insertion doen not exists
      if (!response.ok) {
        setExistsURL(false);

        // Return to the home page.
        navigate("/");
      } else {
        // Insertion exists
        setExistsURL(true);

        // Get the insertion's details
        const data = await response.json();

        setInsertion(data);
      }
    })();
  }, [insertion_id, navigate]);

  return (
    // If the insertion exists go to the insertion page
    <div>{existsURL === true && <InsertionDetail insertion={insertion} />}</div>
  );
}

export default ProtectedRouteInsertion;
