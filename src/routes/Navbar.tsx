import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, InputGroup, Row, Col, Nav, Navbar, Dropdown, Card, Carousel, Modal } from 'react-bootstrap';
import '../styles/MenuBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faShoppingCart, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';


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
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleSignUp = () => {
        setShowSignUpModal(true);
    };

    const handleCloseSignUpModal = () => {
        setShowSignUpModal(false);
    };
    const handleSaveChanges = () => {
        const form = document.getElementById('signup-form');
        if (form.checkValidity() === false) {
            // If the form is not valid, set the validated state to true to show validation feedback
            setValidated(true);
        } else {
            // Implement your logic to save changes here
            // For example, you can send a request to your backend API
            // to handle the sign-up process.
            // Once changes are saved, you can close the modal.
            setShowSignUpModal(false);
            // Reset the validation state for the next time the modal is opened
            setValidated(false);
        }
    };

    return (
        <div>
            <nav className='navbar bg-primary'>
                <Container className=''>
                    <Row className='align-items-center'>
                        <Col>
                            <a className='navbar-brand'>
                                <img src='src/assets/Hanover.png' alt='Logo' style={{ width: '5rem' }} />
                            </a>
                        </Col>
                        <Col className='left'>
                            <Form className='ml-auto'>
                                <InputGroup className='mb-3' style={{ width: '20rem' }} >
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
                                            <FontAwesomeIcon icon={faBell} className='text-white' />
                                        </Nav.Item>
                                        <Nav.Item className='me-5 text-white mt-3'>
                                            <UserDropdown handleSignUp={handleSignUp} />
                                        </Nav.Item>

                                        <Modal show={showSignUpModal} onHide={handleCloseSignUpModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Sign Up</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form noValidate validated={validated} onSubmit={handleSubmit} id="signup-form">
                                                    <Row>
                                                        <Col className="mb-3">
                                                            <Form.Group controlId="validationCustom01">
                                                                <Form.Control type="text" placeholder="Enter your name" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a name.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="validationCustom02">
                                                                <Form.Control type="email" placeholder="Enter your email" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide a valid email.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Group controlId="validationCustom03">
                                                                <Form.Control type="text" placeholder="Enter your address" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide address.
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Group controlId="validationCustom04" >
                                                                <Form.Control type="tel" placeholder="Enter your phone number" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide your phone number
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="validationCustom05">
                                                                <Form.Control as="select" required>
                                                                    <option>Male</option>
                                                                    <option>Female</option>
                                                                    <option>Other</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="validationCustom06">
                                                                <Form.Control type="text" placeholder="Enter your income" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide your income
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-3" controlId="validationCustom06">
                                                                <Form.Control type="password" placeholder="Enter Password" required />
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please provide your password
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseSignUpModal}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={handleSaveChanges}>
                                                    Sign Up
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
                <Card style={{ width: '56rem', height: '17rem', marginTop: '12%', marginLeft: '10.5%' }} className='mb-5'>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
            </Container>
        </div>
    );
}

export default LandingPage;
