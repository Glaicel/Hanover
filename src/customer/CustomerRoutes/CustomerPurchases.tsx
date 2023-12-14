import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Dropdown, Form, Nav, Navbar, Modal, Button as BootstrapButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



function CustomerPurchase() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    useEffect(() => {
        fetchCustomerTransaction(); // Fetch transaction data from the server and update the state
    }, []);

    const fetchCustomerTransaction = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://carfinity.test/api/customer/transactions',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response);

            if (Array.isArray(response.data) && response.data.length > 0) {
                setPurchases(response.data);
            } else {
                console.error('Invalid response format for company data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching purchase data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileClick = () => {
        // Redirect to the profile page
        navigate('/customer-profile');
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
                <Container fluid style={{ marginRight: '5%' }} className='mt-2 mb-2'>
                    <Link to="/customer-page" className='text-decoration-none'>
                        <Navbar.Brand>
                            <img className="img-fluid w-50" src='src/assets/HANOVER.png' />
                        </Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {/* Navigation items on the right side */}
                        <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link to="/customer-page" className='me-5 text-decoration-none text-white mt-2'>
                                <i className="bi bi-house-door-fill me-2"></i>
                                Home
                            </Link>
                            <Link to="/customer-purchase" className='me-5 text-decoration-none text-white mt-2'>
                                <i className="bi bi-cart-fill me-2"></i>
                                Purchases
                            </Link>
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
            <Container className="mt-3">
                <h2 className="mt-4">Purchase History</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Dealer ID</th>
                            <th>Dealer Name</th>
                            <th>VIN</th>
                            <th>Model Name</th>
                            <th>Brand Name</th>
                            <th>Color</th>
                            <th>Engine Type</th>
                            <th>Transmission Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Invoice</th>
                            {/* Add other table headers based on your TransactionData structure */}
                        </tr>
                    </thead>
                    <tbody>
                        {purchases ? (
                            purchases.map((purchase) => (
                                <tr key={purchase.customer_transaction_id}>
                                    <td>{purchase.customer_transaction_id}</td>
                                    <td>{purchase.dealer_id}</td>
                                    <td>{purchase.dealer_name}</td>
                                    <td>{purchase.vin}</td>
                                    <td>{purchase.model_name}</td>
                                    <td>{purchase.brand_name}</td>
                                    <td>{purchase.color}</td>
                                    <td>{purchase.engine_type}</td>
                                    <td>{purchase.transmission_type}</td>
                                    <td>{purchase.price}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.amount}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => setSelectedPurchase(purchase)}
                                        >
                                            Invoice
                                        </Button>
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
            </Container>
            <Modal show={selectedPurchase !== null} onHide={() => setSelectedPurchase(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display purchase information in an invoice format */}
                    {selectedPurchase && (
                        <div>
                            {/* Add invoice details based on your purchase structure */}
                            <p>Transaction ID: {selectedPurchase.customer_transaction_id}</p>
                            <p>Dealer Name: {selectedPurchase.dealer_name}</p>
                            <p>Customer Name: {selectedPurchase.customer_name}</p>
                            <p>VIN:{selectedPurchase.vin}</p>
                            <p>Model Name:{selectedPurchase.model_name}</p>
                            <p>Brand Name:{selectedPurchase.brand_name}</p>
                            <p>Color:{selectedPurchase.color}</p>
                            <p>Engine Type:{selectedPurchase.engine_type}</p>
                            <p>Transmission Type:{selectedPurchase.transmission_type}</p>
                            <p>Price:{selectedPurchase.price}</p>
                            <p>Quantity:{selectedPurchase.quantity}</p>
                            <p>Amount{selectedPurchase.amount}</p>
                            {/* Add other details here... */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="secondary" onClick={() => setSelectedPurchase(null)}>
                        Close
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default CustomerPurchase;