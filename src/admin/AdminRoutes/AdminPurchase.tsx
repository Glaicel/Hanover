import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Transaction {
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

function AdminOrder() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchTransaction(); // Fetch transaction data from the server and update the state
    }, []);

    const fetchTransaction = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const response = await axios.get(
                'http://carfinity.test/api/dealer-transaction/admin/select',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response);

            if (Array.isArray(response.data)) {
                setTransactions(response.data);
            } else {
                console.error('Invalid response format for transaction data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
                <Card style={{ width: '60rem' }} className='ms-5 mt-4 mb-4'>
                    <Card.Body>
                        <Table striped bordered hover className='mt-3'>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User ID</th>
                                    <th>VIN</th>
                                    <th>Model Name</th>
                                    <th>Brand Name</th>
                                    <th>Color</th>
                                    <th>Engine Type</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                    {/* Add other table headers based on your TransactionData structure */}
                                </tr>
                            </thead>
                            <tbody>
                                {transactions ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction.transaction_id}>
                                            <td>{transaction.transaction_id}</td>
                                            <td>{transaction.user_id}</td>
                                            <td>{transaction.vin}</td>
                                            <td>{transaction.model_name}</td>
                                            <td>{transaction.brand_name}</td>
                                            <td>{transaction.color}</td>
                                            <td>{transaction.engine_type}</td>
                                            <td>{transaction.price}</td>
                                            <td>{transaction.quantity}</td>
                                            <td>{transaction.amount}</td>
                                            {/* Add other table cells based on your TransactionData structure */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>Loading...</td>
                                    </tr>
                                )}

                            </tbody>

                        </Table>

                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default AdminOrder;