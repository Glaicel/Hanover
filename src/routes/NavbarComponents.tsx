// NavbarComponent.jsx

import React from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faShoppingCart, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function UserDropdown({ handleSignUp }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} className='text-white' />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleSignUp}>Sign Up</Dropdown.Item>
                <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function NavbarComponent({ handleSignUp }) {
    return (
        <Navbar bg="primary" variant="dark">
            {/* Add your Navbar content here */}
            <Nav className="ml-auto">
                <Nav.Item className='me-4 text-white mt-2'>
                    <Nav.Link>
                        <FontAwesomeIcon icon={faHome} className='text-white' /> Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='me-5 text-white mt-2'>
                    <Nav.Link>
                        <FontAwesomeIcon icon={faShoppingCart} className='text-white' /> Shop
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className='me-5 text-white mt-3'>
                    <FontAwesomeIcon icon={faBell} className='text-white' />
                </Nav.Item>
                <Nav.Item className='me-5 text-white mt-3'>
                    <UserDropdown handleSignUp={handleSignUp} />
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default NavbarComponent;
