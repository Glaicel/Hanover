import { Navbar, Container, Card, Row, Col, CardGroup, Table } from 'react-bootstrap';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import '../styles/AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';


function AdminDashboard() {
    const [transactionCount, setTransactionCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [revenueCount, setRevenueCount] = useState(0);
    const token = localStorage.getItem('token');



    const fetchTransaction = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/admin/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // Check the structure of data and adjust accordingly
            setTransactionCount(data); // Assuming it's dealer_count, adjust as needed
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }

    const fetchCustomerData = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/dealer/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // Check the structure of data and adjust accordingly
            setCustomerCount(data.dealer_count); // Assuming it's dealer_count, adjust as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/vehicle/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // Check the structure of data and adjust accordingly
            setProductCount(data.vehicle_count); // Assuming it's dealer_count, adjust as needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTransaction();
        fetchCustomerData();
        fetchProductData();
    }, [])

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <AdminSidebar />
                <Container>
                    <Navbar expand="lg" className="bg-white custom-nav shadow-sm">
                        <Container>
                            <Navbar.Brand href="#">Dashboard</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <CardGroup className='group mt-3' style={{ width: '70rem', height: '10rem' }}>
                        <Card className='me-4 shadow-sm border-0 rounded'>
                            <Card.Body>
                                <Card.Title>
                                    Total Purchased
                                </Card.Title>
                                <h1 style={{ marginLeft: '40%' }} className='mt-4'><strong>{transactionCount}</strong></h1>
                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>
                            <Card.Body>
                                <Card.Title>Total Revenue</Card.Title>
                                <h1 style={{ marginLeft: '40%' }} className='mt-4'>{revenueCount}</h1>
                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>
                            <Card.Body>
                                <Card.Title>Product Items</Card.Title>
                                <h1 style={{ marginLeft: '40%' }} className='mt-4'>{productCount}</h1>
                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>
                            <Card.Body>
                                <Card.Title>Total Customers</Card.Title>
                                <h1 style={{ marginLeft: '40%' }} className='mt-4'><strong>{customerCount}</strong></h1>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    <Card className='mt-3 border-0 shadow-sm' style={{ marginLeft: '17%', width: '45rem', height: '24rem' }}>
                        <Card.Body>
                            <Card.Title>Recent Orders</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Photo</th>
                                        <th>Product ID</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Add your table rows here */}
                                    <tr>
                                        <td>Product 1</td>
                                        <td><img src="product1.jpg" alt="Product 1" style={{ width: '50px', height: '50px' }} /></td>
                                        <td>123456</td>
                                        <td>$20.00</td>
                                        <td>2023-11-29</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card className=' border-0 shadow-sm best-sell' style={{ marginLeft: '72.5%', marginTop: '-28.5%', width: '22rem', height: '23.8rem' }}>
                        <Card.Body>
                            <Card.Title>Best Sell Products</Card.Title>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Lenovo</td>
                                        <td>$50</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default AdminDashboard;
