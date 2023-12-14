import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BrandsComponent = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 3; // N
    const [brandModels, setBrandModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBrands();
    }, []); // Fetch brands when the component mounts

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://carfinity.test/api/brand/select/public');
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    };

    console.log('Brands:', brands);

    if (loading) {
        return <p>Loading brands...</p>;
    }

    if (!brands || brands.length === 0) {
        return <p>No brands available</p>;
    }

    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCardClick = async (brandId: number) => {
        try {
            const response = await axios.get(`http://carfinity.test/api/brand/models/${brandId}`);
            setBrandModels(response.data.models);
            // Navigate to the brand details page
            navigate(`/brand/${brandId}`);
        } catch (error) {
            console.error('Error fetching brand models:', error);
        }
    };


    return (
        <>
            <Card style={{ width: '60rem', marginLeft: '10%', marginRight: '10%' }} className="mb-5">
                <Container style={{ marginLeft: '1.5j%' }}>
                    <Row xs={1} md={3} className='g-4 mt-2' style={{ marginRight: '3%' }}>
                        {currentBrands.map((brand) => (
                            <Col key={brand.brand_id} className="mb-4">
                                <Card
                                    style={{ width: '18rem', cursor: 'pointer' }}
                                    onClick={() => handleCardClick(brand.brand_id)}
                                >
                                    <Card.Img variant="top" src={brand.image_data} style={{ objectFit: 'cover', height: '10rem' }} />
                                    <Card.Body>
                                        <Card.Title>{brand.brand_name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination className="justify-content-end" style={{ marginRight: '5.2%' }}>
                        {Array.from({ length: Math.ceil(brands.length / brandsPerPage) }).map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
                <Container>
                    {/* Display brand models here using the brandModels state */}
                    {brandModels.map((model) => (
                        <div key={model.brand_name}>{model.model_name}</div>
                    ))}
                </Container>
            </Card>
        </>
    );
};

export default BrandsComponent;
