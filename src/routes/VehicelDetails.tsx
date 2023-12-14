// Import necessary dependencies
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { VehicleData } from './Navbar';
import { Button, Card, CardGroup, Spinner, Modal, Col, Row, Form } from 'react-bootstrap'; // Import Bootstrap Card component



// Define the props interface
interface VehicleDetailsProps {
    vehicle: VehicleData;
}

// Define the functional component
const VehicleDetailsPage: React.FC<VehicleDetailsProps> = () => {
    // Use the useLocation hook to get the current location
    const location = useLocation();

    // Retrieve the vehicle from the location state
    const locationVehicle = location.state?.vehicle;

    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [signUpFormData, setSignUpFormData] = useState({
        name: "",
        email: "",
        // Add other fields as needed
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Check if the vehicle is available in the location state
    if (!locationVehicle) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    const handleCheckout = () => {
        // Open the sign-up modal when clicking the Checkout button
        setShowSignUpModal(true);
    };

    const handleCloseSignUpModal = () => {
        // Close the sign-up modal
        setShowSignUpModal(false);
    };

    // Render the vehicle details inside a Bootstrap Card
    return (
        <div>
            <h2 className="mt-4" style={{ marginLeft: '15%' }}>{locationVehicle.model_name}</h2>
            <CardGroup style={{ width: '60rem,', marginLeft: '15%', marginTop: '3%', marginRight: '15%' }} className="shadow-lg" key={locationVehicle.vin}>
                <Card className='border-0' style={{ height: '30rem', }}>
                    <Card.Img className='mt-5' src={`/${locationVehicle.model_image_path}`}
                        alt={locationVehicle.model_name}
                    />
                </Card>
                <Card className='border-0' style={{}}>
                    <Card.Body className='mt-5 ms-5'>
                        <Card.Title>{locationVehicle.model_name}</Card.Title>
                        <Card.Text>
                            {locationVehicle.brand_name} - {locationVehicle.color}
                        </Card.Text>
                        <Card.Text>
                            {locationVehicle.engine_type}
                        </Card.Text>
                        <Card.Text>
                            Price: ${locationVehicle.price}
                        </Card.Text>
                        {/* Add other vehicle information as needed */}
                        <Button variant="primary" onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>
            <Modal show={showSignUpModal} onHide={handleCloseSignUpModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col className="mb-3">
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        name="name"
                                        value={signUpFormData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={signUpFormData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Add other input fields as needed */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSignUpModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Export the component
export default VehicleDetailsPage;