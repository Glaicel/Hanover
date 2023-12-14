import { Container, Table } from "react-bootstrap";
import NavigationBar from "../DealerNavy/DealerNavbar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";

export interface DealerProducts {
    dealer_product_id: number,
    brand_name: string,
    vin: string,
    model_name: string,
    color: string,
    engine_type: string,
    transmission_type: string,
    selling_price: number,
    dealer_name: string,
    image_path: string,
    quantity: number,
}

function DealerProducts() {
    const navigate = useNavigate();
    const [dealerProducts, setDealerProducts] = useState<DealerProducts[]>([]);

    useEffect(() => {
        fetchProductData(); // Fetch transaction data from the server and update the state
    }, []);

    const fetchProductData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://carfinity.test/api/dealer-products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            if (Array.isArray(response.data) && response.data.length > 0) {
                setDealerProducts(response.data);
            } else {
                console.error('Invalid response format for company data:', response.data);
            }
        } catch (error) {
            console.error('Error fetching order data:', error);
        }

    }


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <NavigationBar onLogout={handleLogout} />
            <Container>
                <h1>Products</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Brand Name</th>
                            <th>Model Name</th>
                            <th>Color</th>
                            <th>Engine Type</th>
                            <th>Transmission Type</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dealerProducts.map((product) => (
                            <tr key={product.dealer_product_id}>

                                <td>
                                    {product.image_path ? (
                                        <img src={product.image_path} alt="Car" style={{ width: '80px', height: '50px' }} />
                                    ) : (
                                        <div>No Image</div>
                                    )}
                                </td>

                                <td>{product.brand_name}</td>
                                <td>{product.model_name}</td>
                                <td>{product.color}</td>
                                <td>{product.engine_type}</td>
                                <td>{product.transmission_type}</td>
                                <td>{product.selling_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>


        </>
    );
}

export default DealerProducts;

