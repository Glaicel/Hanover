import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { VehicleData } from './Navbar';

interface BrandModel {
    brand_id: number;
    company_id: number;
    brand_name: string;
    model_id: number;
    model_name: string;
    vin: string;
    color: string;
    transmission_type: string;
    is_diesel: boolean;
    price: number;
    image_path: string;
    availability: string;
}

const BrandDetailsPage = () => {
    const { brandId } = useParams();
    const [brandModels, setBrandModels] = useState<BrandModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const navigate = useNavigate();

    const handleBuyNow = (data: { vin: string; model_name: string; brand_name: string; price: number; image_path: string }) => {
        console.log(data);
        navigate(`/vehicle-details/${data.vin}`, { state: { vehicle: data } });
    };


    useEffect(() => {
        fetchBrandModels();
        console.log('Brand Models:', brandModels);
    }, [brandId]);

    const fetchBrandModels = async () => {
        try {
            const response = await axios.get(`http://carfinity.test/api/brand/models/${brandId}`);
            setBrandModels(response.data.models);
        } catch (error) {
            setError('Error fetching brand models');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading brand details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2 className='mt-2 ms-5'>Vehicles</h2>
            <Row xs={1} md={4} className="g-4">
                {brandModels.length > 0 ? (
                    brandModels.map((model) => (
                        <Col key={model.vin}>
                            <Card style={{ width: '20rem', marginLeft: '10%', marginRight: '10%' }} className="mb-5 mt-5 border-0 shadow-sm">
                                <Card.Img variant="top" src={`http://localhost:5173/${model.image_path}`} alt={model.model_name} style={{ width: '20rem', height: '12rem' }} />
                                <Card.Body>
                                    <Card.Title>{model.model_name}</Card.Title>
                                    <Card.Text>{model.brand_name}</Card.Text>
                                    <Card.Text>{model.price}</Card.Text>
                                    {/* Add more Card components properties as needed */}
                                    <Button variant="primary" onClick={() => handleBuyNow(model)}>Buy now</Button>
                                </Card.Body>
                                <Card.Footer>
                                    {model.availability}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No models found for this brand.</p>
                )}
            </Row>
        </div>

    );
};

export default BrandDetailsPage;
