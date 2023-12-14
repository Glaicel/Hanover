// ProductDetails.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, CardGroup, Card, Container, Badge, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../dealer/DealerNavy/Transaction/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductDetailsProps { }

interface CustomerTransaction {
    brand_name: string;
    VIN: string;
    model_name: string;
    color: string;
    engine_type: string;
    transmission_type: string
    selling_price: number;
    dealer_name: string;
    dealer_id: number;
    quantity: number;
    amount: number;
    customer_name: string;
    customer_id: number;
    address: string;
    created_at: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
    const { dealer_product_id } = useParams();
    const [productDetails, setProductDetails] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [customerTransaction, setCustomerTransaction] = useState<CustomerTransaction[]>([]);
    const token = localStorage.getItem('token');
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();



    const handleCloseModal = () => setShowModal(false);


    const handleCheckout = () => {
        // Perform checkout logic with selected options
        setShowModal(true);
        // You can add additional logic here, like sending the checkout data to your server
        // and handling the success/failure response.
        // For simplicity, just logging the selected options for now.
    };

    const handleConfirmation = async (confirmed: boolean) => {
        // If user confirmed, perform checkout logic
        if (confirmed) {
            try {
                const customerTransaction: CustomerTransaction = {
                    brand_name: productDetails.brand_name,
                    VIN: productDetails.vin,
                    model_name: productDetails.model_name,
                    color: productDetails.color,
                    engine_type: productDetails.engine_type,
                    transmission_type: productDetails.transmission_type,
                    selling_price: productDetails.selling_price,
                    dealer_id: productDetails.dealer_id,
                    customer_name: user ? user.name : null,
                    dealer_name: productDetails.dealer_name,
                    quantity: quantity,
                    amount: productDetails.selling_price * quantity,
                    customer_id: user ? user.id : null,
                    address: user ? user.address : null,
                    created_at: new Date().toISOString(),
                };

                const response = await axios.post(
                    'http://carfinity.test/api/customer/checkout',
                    customerTransaction,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                toast.success('Checkout successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                console.log('API Response:', response.data);

                // Assuming response.data is the new transaction data
                setCustomerTransaction([response.data]);

            } catch (error) {
                console.error('Error during checkout:', error);
                // Handle error as needed
            } finally {
                // Close the modal
                handleCloseModal();
            }
        } else {
            // If user did not confirm, just close the modal
            handleCloseModal();
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(
                    `http://carfinity.test/api/product/${dealer_product_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                // Handle error as needed
            }
        };

        // Call the fetch function
        fetchProductDetails();
    }, [dealer_product_id]);

    if (!productDetails) {
        // Loading state or error handling can be added here
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Container>
                <h2 className='mt-5'>Product Details</h2>
                <CardGroup className='w-100 mt-4 shadow-lg rounded' style={{ height: '30rem' }}>
                    <Card className='border-0'>
                        <Card.Img src={`http://localhost:5173/${productDetails.image_path}`} />
                    </Card>
                    <Card className='border-0'>
                        <Card.Title className='mt-5 ms-5'>
                            <h2>{productDetails.model_name}</h2>
                        </Card.Title>
                        <Card.Body className='ms-5'>
                            <Card.Text>VIN:{productDetails.vin}</Card.Text>
                            <Card.Text>Brand: {productDetails.brand_name}</Card.Text>
                            <Card.Text>Price: {productDetails.selling_price}</Card.Text>
                            <Card.Text> Dealer: {productDetails.dealer_name}</Card.Text>
                            <Card.Text>Color: {productDetails.color}</Card.Text>
                            <Card.Text>Engine:{productDetails.engine_type}</Card.Text>
                            <Card.Text>Transmission: {productDetails.transmission_type}</Card.Text>
                            <Card.Text>Transmission: {productDetails.selling_price}</Card.Text>
                            {/* Display quantity input on the card */}
                            <div className="input-group mb-3" style={{ width: '30%' }}>
                                <Button
                                    variant="outline-secondary"
                                    style={{ width: '30px' }}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </Button>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                                    style={{ width: '10px', textAlign: 'center' }}
                                />
                                <Button
                                    variant="outline-secondary"
                                    style={{ width: '30px' }}
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                            <Button variant='primary' onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
            <Modal show={showModal} onHide={() => handleConfirmation(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to checkout with {quantity} item?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleConfirmation(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmation(true)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductDetails;
