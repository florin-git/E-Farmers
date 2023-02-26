import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../api/axiosInsertions";
import BookingItem from "../components/BookingItem";
import useAuth from "../hooks/useAuth";

function BookedProducts() {
        // Authentication data from context storage
    const { auth } = useAuth();
    const userId = auth.userId;

    const [requests, setRequests] = useState([]);

    useEffect(() => {
            (async () => {
            await axiosInstance
                .get("booking/requests/", {
                params: {
                    user_id: userId,
                },
                })
                .then((res) => {
                setRequests(res.data);
                })
                .catch((error) => {
                return error.response;
                });
            })();
        }, []);

    const requets_array = requests.map((request) => {
        return (
            <BookingItem inbox='false' title={request.title} comment={request.comment} weight={request.weight} deadline={request.deadline} user={request.user} farmer={request.farmer} />
        );
    })

    return (
        <ul className="list-inline shadow g-3 pt-3 pb-3">
            {requets_array}
        </ul>
    );
}

export default BookedProducts;