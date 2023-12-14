import axios from "axios";
import { useEffect, useState } from "react";
import NavigationBar from "../DealerNavbar";
import { useNavigate } from "react-router-dom";
import { Container, Table, Form, FormControl, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'


function SoldProducts() {
    const [solds, setSolds] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [search, setSearch] = useState("");


    const fetchSold = async () => {
        try {
            const response = await axios.get('http://carfinity.test/api/dealer/sold/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response);
            setSolds(response.data);
        } catch (error) {
            console.error('Error fetching specific vehicle details:', error);
        }
    };


    const fetchSoldProducts = async (search: any) => {
        try {
            console.log(search)
            console.log(token);
            const response = await fetch("http://carfinity.test/api/dealer/product-show", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    search: search
                })
            })
            return response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    useEffect(() => {
        fetchSoldProducts(search);
        fetchSold();
    }, []);

    const handleSearch = () => {
        fetchSoldProducts(search)
            .then((result) => {
                setSolds(result);
                console.log(result);
                setSearch("")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <>
            <NavigationBar onLogout={handleLogout} />
            <Container className="mt-5">
                <Form as="div" className="d-flex mt-4 w-50" style={{ marginLeft: '25%' }}>
                    <FormControl type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="mr-sm-2"
                        value={search}
                        onInput={(e) => setSearch(e.currentTarget.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent default behavior (e.g., form submission)
                                handleSearch();
                            }
                        }}
                    />
                    <Button variant="outline-info"
                        className="btn btn-primary my-0"
                        type="button"
                        onClick={(e) => {
                            handleSearch()
                        }}
                    >
                        <i className="bi bi-search text-white"></i>
                    </Button>
                </Form>

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>VIN</th>
                            <th>Model Name</th>
                            <th>Brand Name</th>
                            <th>Color</th>
                            <th>Engine Type</th>
                            <th>Transmission Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Address</th>
                            {/* Add other table headers based on your TransactionData structure */}
                        </tr>
                    </thead>
                    <tbody>
                        {solds ? (
                            solds.map((sold) => (
                                <tr key={sold.customer_transaction_id}>
                                    <td>{sold.customer_transaction_id}</td>
                                    <td>{sold.customer_id}</td>
                                    <td>{sold.customer_name}</td>
                                    <td>{sold.vin}</td>
                                    <td>{sold.model_name}</td>
                                    <td>{sold.brand_name}</td>
                                    <td>{sold.color}</td>
                                    <td>{sold.engine_type}</td>
                                    <td>{sold.transmission_type}</td>
                                    <td>{sold.price}</td>
                                    <td>{sold.quantity}</td>
                                    <td>{sold.amount}</td>
                                    <td>{sold.address}</td>
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
        </>
    );

}

export default SoldProducts;