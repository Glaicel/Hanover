// NavigationBar.tsx
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';


interface Brand {
    brand_id: number;
    brand_name: string;
    image_data: string;
    // Add more properties as needed
}

interface NavigationBarProps {
    onLogout: () => void;
}


const NavigationBar: React.FC<NavigationBarProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
    };
    const handleProfileClick = () => {
        // Redirect to the profile page
        navigate('/dealer-profile');
    };

    return (
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
            <Container fluid style={{ marginRight: '5%' }} className='mt-2 mb-2'>
                <Link to="/dealer-dashboard" className='text-decoration-none'>
                    <Navbar.Brand>
                        <img src='src/assets/Hanover.png' alt='Logo' style={{ width: '10rem' }} />
                    </Navbar.Brand>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {/* Navigation items on the right side */}
                    <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink to="/dealer-dashboard" className='me-5 text-decoration-none text-white mt-2 nav-pill'>
                            <i className="bi bi-house-door-fill me-2"></i>
                            Home</NavLink>
                        <NavLink to="/purchase" className='me-5 text-decoration-none text-white mt-2 nav-pill' >
                            <i className="bi bi-cart-fill me-2"></i>
                            Purchase</NavLink>
                        <NavLink to="/products" className='me-5 text-decoration-none text-white mt-2 nav-pill'>
                            <i className="bi bi-shop me-2"></i>
                            Products</NavLink>
                        <NavLink to="/sold-products" className='me-5 text-decoration-none text-white mt-2 nav-pill'>
                            <i className="bi bi-bookmark-check-fill me-2"></i>
                            Sold Products</NavLink>
                        {/* User icon button */}
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                <i className="bi bi-person"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {/* Add profile and sign-out items here */}
                                <Dropdown.Item onClick={handleProfileClick}>Your Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
