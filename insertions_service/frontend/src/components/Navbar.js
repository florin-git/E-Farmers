import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Navbar(props) {
    function NavDropdownExample() {
        // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    }

    return (
        // <Nav activeKey="1" onSelect={NavDropdownExample}>
        //     <Nav.Item >
        //         <Nav.Link eventKey="1" href="#/home">
        //             E-Farmers
        //         </Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //         <Nav.Link eventKey="2" title="Item">
        //             Insertions
        //         </Nav.Link>
        //     </Nav.Item>
        //     <NavDropdown title="Dropdown" id="nav-dropdown">
        //         <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        //         <NavDropdown.Item eventKey="4.2">
        //             Another action
        //         </NavDropdown.Item>
        //         <NavDropdown.Item eventKey="4.3">
        //             Something else here
        //         </NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item eventKey="4.4">
        //             Separated link
        //         </NavDropdown.Item>
        //     </NavDropdown>
        // </Nav>
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
