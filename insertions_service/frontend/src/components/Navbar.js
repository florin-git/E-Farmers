import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"insertions/"}>
                    e-Farmers
                </Link>
                <Link className="btn btn-primary" to={"insertions/new"}>Publish an Insertion</Link>
            </div>
        </nav>
    );
}

export default Navbar;
