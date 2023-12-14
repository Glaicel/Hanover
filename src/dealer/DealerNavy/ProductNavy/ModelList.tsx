// BrandModelsPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, CardGroup, Container } from 'react-bootstrap';


interface BrandModel {
    VIN: string;
    model_id: number; // Add the missing property
    model_name: string;
    brand_name: string;
    color: string;
    engine_type: string;
    transmission_type: string;
    price: number;
    availability: string;
    model_image_path: string;
}

const BrandModelsPage: React.FC<{ brandId: number }> = () => {
    const { brandId } = useParams();
    const [brandModels, setBrandModels] = useState<BrandModel[]>([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBrandModels = async () => {
            try {
                const response = await axios.get(`http://carfinity.test/api/brand-models/${brandId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBrandModels(response.data.models);
            } catch (error) {
                console.error('Error fetching brand models:', error);
            }
        };

        fetchBrandModels();
    }, [brandId]);

    return (
        <div>
            <h1>Models</h1>
            <Container>
                <CardGroup>
                    {brandModels.map((model) => (
                        <Card key={model.model_id}>
                            {/* You can customize the Card component based on your model properties */}
                            <Card.Img variant="top" src={`http://localhost:5173/${model.model_image_path}`} alt={model.model_name} />
                            <Card.Body>
                                <Card.Title>{model.model_name}</Card.Title>
                                <Card.Text>{model.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </CardGroup>
            </Container>

        </div>
    );
};

export default BrandModelsPage;
