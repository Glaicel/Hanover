import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Form, Spinners, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { VehicleData } from '../DealerSideBar';
import { useAuth } from '../Transaction/Auth';
import './Card.css'


interface BuyNowProps {
    vehicle: VehicleData;
}


export interface Transaction {
    transaction_id: number;
    model_image_path: string;
    VIN: string;
    model_name: string;
    brand_name: string;
    color: string;
    engine_type: string;
    transmission_type: string;
    price: number;
    quantity: number;
    amount: number;
    user_id: number;
    created_at: string;
}

const BuyNow: React.FC<BuyNowProps> = ({ vehicle }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedColor, setSelectedColor] = useState(vehicle.color);
    const [selectedEngineType, setSelectedEngineType] = useState(vehicle.engine_type);
    const [quantity, setQuantity] = useState(1);
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleCheckout = async () => {
        try {

            setLoading(true);

            const token = localStorage.getItem('token');
            console.log('Token:', token);
            // Create an instance of TransactionData and copy the relevant data
            const transactionData: Transaction = {
                VIN: vehicle.vin,
                image_path: vehicle.model_image_path,
                model_id: vehicle.model_id,
                model_name: vehicle.model_name,
                brand_name: vehicle.brand_name,
                color: selectedColor, // Use the selected color
                engine_type: selectedEngineType, // Use the selected engine type
                transmission_type: vehicle.transmission_type,
                price: vehicle.price, // Original price from the vehicle
                quantity: quantity,
                amount: vehicle.price * quantity,
                user_id: user ? user.id : null,
            };

            console.log("data =" + transactionData);

            const response = await axios.post(
                'http://carfinity.test/api/dealer/transaction/details/insert',
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response);

            setTransaction([...transaction, response.data]);

            handleCloseModal();
        } catch (error) {
            console.error('Error during checkout:', error);
            // Handle error (show an error message or redirect to an error page)
        } finally {
            setLoading(false); // Set loading back to false when the operation is complete
        }
    };
    return (
        <>
            <Card className="border-0 shadow-sm me-2 mb-5 hover-card" style={{ width: '300px' }}>
                <Card.Img src={vehicle.model_image_path} />
                <Card.Body>
                    <Card.Title>{vehicle.model_name}</Card.Title>
                    <Card.Text>
                        Brand: {vehicle.brand_name}<br />
                        VIN: {vehicle.vin}<br />
                        Color: {vehicle.color}<br />
                        Engine Type: {vehicle.engine_type}<br />
                        Transmission Type: {vehicle.transmission_type}<br />
                        Price: ${vehicle.price}<br />
                        Availability: {vehicle.availability}
                    </Card.Text>
                    <Button variant="primary" onClick={handleShowModal} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </>
                        ) : 'Buy Now'}
                    </Button>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal} centered >
                <Modal.Header closeButton>
                    <Modal.Title>{vehicle.model_name} Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Card.Img src={vehicle.model_image_path} style={{ width: '50%' }} />
                        <Card.Body style={{ width: '50%' }}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity</Form.Label>
                                    <div className="input-group">
                                        <Button
                                            variant="outline-secondary"
                                            style={{ width: '10px' }}
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            -
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                                            style={{ width: '60px', textAlign: 'center' }}
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            style={{ width: '30px' }}
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedColor}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                    >
                                        {/* Add options for colors */}
                                        <option value="black">Black</option>
                                        <option value="white">White</option>
                                        <option value="gray">Gray</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        {/* Add more color options as needed */}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Engine Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedEngineType}
                                        onChange={(e) => setSelectedEngineType(e.target.value)}
                                    >
                                        {/* Add options for engine types */}
                                        <option value="gasoline">Gasoline</option>
                                        <option value="electric">Electric</option>
                                        {/* Add more engine type options as needed */}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCheckout} disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span className="visually-hidden">Loading...</span>
                            </>
                        ) : 'Checkout'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BuyNow;
