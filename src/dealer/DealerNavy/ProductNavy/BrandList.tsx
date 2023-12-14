import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


interface Brand {
    brand_id: number;
    brand_name: string;
    image_data: string;
    // Add more properties as needed
}

const BrandsList = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 3; // N
    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://carfinity.test/api/brand/select', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });// Log the entire response
                setBrands(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    console.log('Brands:', brands); // Log the brands state


    // Check if the data is still loading
    if (loading) {
        return <p>Loading brands...</p>;
    }

    // Check if brands is undefined or empty after loading
    if (!brands || brands.length === 0) {
        return <p>No brands available</p>;
    }

    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);


    // Change page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const fetchBrandModels = async (brandId: number) => {
    //     try {
    //         const response = await axios.get(`http://carfinity.test/api/brand-models/${brandId}`);
    //         setBrandModels(response.data.models);
    //     } catch (error) {
    //         console.error('Error fetching brand models:', error);
    //     }
    // };

    const handleCardClick = (brand: Brand) => {
        // Fetch brand models when a card is clicked
        navigate(`brand/models/${brand.brand_id}`);
    };



    return (
        <>
            <Card style={{ width: '57rem', marginLeft: '10%', marginRight: '10%' }} className="mb-5 border-0 shadow-sm bg-light">
                <Container style={{ marginLeft: '1.5j%' }}>
                    <Row xs={1} md={3} className='g-4 mt-2' style={{ marginRight: '3%' }}>
                        {currentBrands.map((brand) => (
                            <Col key={brand.brand_id} className="mb-4">
                                <Card style={{ width: '17rem', cursor: 'pointer' }}
                                    className='ms-3'
                                    onClick={() => handleCardClick(brand)}
                                >
                                    <Card.Img variant="top" src={brand.image_data} style={{ objectFit: 'cover', height: '10rem' }} />
                                    <Card.Body>
                                        <Card.Title>{brand.brand_name}</Card.Title>
                                        {/* Add more Card components properties as needed */}
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
            </Card>

        </>

    );
};

export default BrandsList;