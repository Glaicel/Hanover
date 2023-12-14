import { useEffect, useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import NavigationBar from '../DealerNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Transaction/Auth';


export interface Purchase {
    transaction_id: number;
    image_path: string;
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


function Purchase() {
    const [transactions, setTransactions] = useState<Purchase[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [sellingPrice, setSellingPrice] = useState<number>(1);
    const [quantity, setQuantity] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();


    useEffect(() => {
        fetchTransaction(); // Fetch transaction data from the server and update the state
    }, []);

    const fetchTransaction = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://carfinity.test/api/dealer-transaction/select',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response);

            if (Array.isArray(response.data) && response.data.length > 0) {
                setTransactions(response.data);
            } else {
                console.error('Invalid response format for company data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching purchase data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSellClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setSellingPrice(transaction.price);
        setQuantity(transaction.quantity);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            // API request to store the sold transaction
            const storeResponse = await axios.post(
                'http://carfinity.test/api/dealer-products-insert',
                {
                    brand_name: selectedTransaction?.brand_name,
                    VIN: selectedTransaction?.vin,
                    image_path: selectedTransaction?.image_path,
                    model_name: selectedTransaction?.model_name,
                    color: selectedTransaction?.color,
                    engine_type: selectedTransaction?.engine_type,
                    transmission_type: selectedTransaction?.transmission_type,
                    selling_price: sellingPrice,
                    transaction_id: selectedTransaction?.transaction_id,
                    dealer_name: user ? user.name : null, // Assuming dealer name is the name of the authenticated user
                    dealer_id: user ? user.id : null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Store Sold Transaction API Response:', storeResponse);

            // Handle success, e.g., update state or fetch updated transaction data
            fetchTransaction();

            // Close the modal
            setShowModal(false);
        } catch (error) {
            console.error('Error selling transaction:', error);
            // Handle error as needed
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <NavigationBar onLogout={handleLogout} />
            <Container className="mt-3">
                <h2>Purchase History</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>VIN</th>
                            <th>Image</th>
                            <th>Model Name</th>
                            <th>Brand Name</th>
                            <th>Color</th>
                            <th>Engine Type</th>
                            <th>Transmission Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Action</th>
                            {/* Add other table headers based on your TransactionData structure */}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions ? (
                            transactions.map((transaction) => (
                                <tr key={transaction.transaction_id}>
                                    <td>{transaction.transaction_id}</td>
                                    <td>{transaction.vin}</td>
                                    <td>
                                        {transaction.image_path ? (
                                            <img src={transaction.image_path} alt="Car" style={{ width: '80px', height: '50px' }} />
                                        ) : (
                                            <div>No Image</div>
                                        )}
                                    </td>
                                    <td>{transaction.model_name}</td>
                                    <td>{transaction.brand_name}</td>
                                    <td>{transaction.color}</td>
                                    <td>{transaction.engine_type}</td>
                                    <td>{transaction.transmission_type}</td>
                                    <td>{transaction.price}</td>
                                    <td>{transaction.quantity}</td>
                                    <td>{transaction.amount}</td>
                                    <td>
                                        <Button variant="info" onClick={() => handleSellClick(transaction)}>Sell</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Modal show={showModal} onHide={handleModalClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Sell Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="sellingPrice">
                                <Form.Label>Selling Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleModalSubmit} disabled={loading}>
                            {loading ? 'Selling...' : 'Sell'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>

    );
}

export default Purchase;