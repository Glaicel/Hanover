import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, InputGroup, Row, Col, Nav, Navbar, Dropdown, Card, Carousel, Modal, CardGroup } from 'react-bootstrap';
import '../styles/MenuBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faShoppingCart, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';
import BrandsComponent from './Brands';



export interface VehicleData {
    VIN: string;
    model_id: number; // Add the missing property
    model_name: string;
    brand_name: string;
    color: string;
    engine_type: string;
    transmission_type: string;
    price: number;
    availability: string;
    model_image_path: string;
}


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


function LandingPage() {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);// new state for selected\
    const navigate = useNavigate();

    const handleBuyNow = (vehicle: VehicleData) => {
        console.log(vehicle);
        navigate(`/vehicle-details/${vehicle.vin}`, { state: { vehicle } });
    };

    const handleSignUp = () => {
        setShowSignUpModal(true);
    };

    const handleCloseSignUpModal = () => {
        setShowSignUpModal(false);
    };

    const handleSaveChanges = () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        const formData = {
            name,
            email,
            password,
            role: selectedRole,
            address,
            phone_number: phoneNumber,
        };
        console.log('Request Payload:', formData);

        axios.post('http://carfinity.test/api/register', formData)
            .then(response => {
                console.log(response.data);

                toast.success('Registration successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000, // Duration for the notification in milliseconds
                });
                // Close the modal and reset form fields on successful signup
                setShowSignUpModal(false);
                setName("");
                setEmail("");
                setPassword("");
                setSelectedRole("");
                setAddress("");
                setPhoneNumber("");
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Registration failed. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                setIsLoading(false);
            })

    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://carfinity.test/api/vehicle/show/public');
                console.log('Vehicle Data:', response.data);
                setVehicleData(response.data);
            } catch (error) {
                console.error('Error fetching vehicle data:', error);
            }
        };

        fetchData();
    }, []);

    if (vehicleData.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div>
            <nav className='navbar bg-primary'>
                <Container className=''>
                    <Row className='align-items-center'>
                        <Col>
                            <a className='navbar-brand'>
                                <img src='src/assets/Hanover.png' alt='Logo' style={{ width: '10rem' }} />
                            </a>
                        </Col>
                        <Col className='left'>
                            <Form className='ml-auto'>
                                <InputGroup className='mb-3 mt-3' style={{ width: '20rem' }} >
                                    <Button variant='light' id='button-addon2'>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Form.Control
                                        placeholder='Search'
                                        aria-label="Recipient's username"
                                        aria-describedby='basic-addon2'
                                    />
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Navbar bg="primary" variant="dark" className='ml-auto'>
                                <Container>
                                    <Nav className="" variant="underline" >
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
                                            <UserDropdown handleSignUp={handleSignUp} />
                                        </Nav.Item>
                                        <Modal show={showSignUpModal} onHide={handleCloseSignUpModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Sign Up</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Row>
                                                        <Col className="mb-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Form.Control type="text" placeholder="Enter your name" required
                                                                    onChange={(e) => setName(e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="validationCustom02">
                                                                <Form.Control type="email" placeholder="Enter your email" required
                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="validationCustom06">
                                                                <Form.Control type="password" placeholder="Enter Password" required
                                                                    onChange={(e) => setPassword(e.target.value)} />
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Customer"
                                                                    name="role"
                                                                    value="customer"
                                                                    checked={selectedRole === 'customer'}
                                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Dealer"
                                                                    name="role"
                                                                    value="dealer"
                                                                    checked={selectedRole === 'dealer'}
                                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Group>
                                                                <Form.Control type="text" placeholder="Enter your address" required
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group >
                                                                <Form.Control type="tel" placeholder="Enter your phone number" required
                                                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseSignUpModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" type="button" onClick={handleSaveChanges} disabled={isLoading}>
                                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </nav>
            <Container>
                <h1 className='headers'>Drive your Dreams</h1>
                <h4 className='sub-headers'>Your One-Stop Destination for Automotive Excellence</h4>
            </Container>
            <Card style={{ width: '85.4rem', height: '22rem', border: 'none' }} >
                <Card.Body >
                    <Container>
                        <Carousel>
                            <Carousel.Item>
                                <img src='src/assets/carousel/banner.png' style={{ width: '80%', height: '27rem' }}
                                    className='img-fluid banner'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src='src/assets/carousel/banner2.png' style={{ width: '80%', height: '27rem' }}
                                    className='img-fluid banner'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src='src/assets/carousel/banner3.png' style={{ width: '80%', height: '27rem' }}
                                    className='img-fluid banner'
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Container>
                </Card.Body>
            </Card>
            <Container>
            </Container>
            <Container>
                <Row xs={1} md={3} className='g-4' style={{ marginLeft: '10%', marginTop: '10%', marginRight: '8%' }}>
                    {vehicleData.map((vehicle) => (
                        <Col key={vehicle.vin}>
                            <Card className=' border-0 shadow-sm hover-card'>
                                <Card.Img variant="top" src={vehicle.model_image_path} alt={vehicle.model_name} style={{ objectFit: 'cover', height: '8rem' }} />
                                <Card.Body>
                                    <Card.Title>{vehicle.model_name}</Card.Title>
                                    <Card.Text>
                                        {vehicle.brand_name} - {vehicle.color}
                                    </Card.Text>
                                    <Card.Text>
                                        Price: ${vehicle.price}
                                    </Card.Text>
                                    {/* Use Link to navigate to the details page */}
                                    <Button variant="primary" onClick={() => handleBuyNow(vehicle)}>Buy now</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Availability: {vehicle.availability}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Container>
                <h2 style={{ marginTop: '5%', marginLeft: '10.5%' }} className='mb-3'>Popular Brands</h2>
                <BrandsComponent />
            </Container>

            <footer className="bg-dark text-white text-center p-3">
                <p>&copy; {new Date().getFullYear()} Handover</p>
            </footer>
        </div>
    );
}


export default LandingPage;
