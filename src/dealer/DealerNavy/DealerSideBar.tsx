import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DealerSideBar.css';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import { Carousel, Row } from 'react-bootstrap';
import axios from 'axios';
import NavigationBar from './DealerNavbar';
import BuyNow from './Transaction/BuyNow';
import BrandsList from '../DealerNavy/ProductNavy/BrandList';

export interface VehicleData {
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

function DealerSidebar() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const [parts, setParts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchVehicleData();
        fetchParts();
    }, []);


    const fetchVehicleData = async () => {
        try {
            const response = await axios.get('http://carfinity.test/api/vehicle/show', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response);
            setVehicleData(response.data);
        } catch (error) {
            console.error('Error fetching specific vehicle details:', error);
        }
    };

    const fetchParts = async () => {
        try {
            const response = await axios.get('http://carfinity.test/api/part/show', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response);
            setParts(response.data);
        } catch (error) {
            console.error('Error fetching specific vehicle details:', error);
        }
    };

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <NavigationBar onLogout={handleLogout} />
            <Container className='mt-5'>
                <h3 className='mb-4' style={{ marginLeft: '10%' }}>Navigate Style, Accelerate Luxury – Explore Our Cars Todays</h3>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img src='src/assets/carousel/banner.png' style={{ width: '87%', height: '27rem' }}
                            className='img-fluid banner'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='src/assets/carousel/banner2.png' style={{ width: '80%', height: '27rem' }}
                            className='img-fluid banner'
                        />
                    </Carousel.Item>
                    <img src='src/assets/carousel/banner3.png' style={{ width: '80%', height: '27rem' }}
                        className='img-fluid banner'
                    />
                </Carousel>
            </Container>

            <Container className={"mt-5"}>
                <Row xs={1} md={3} className="g-4" style={{ marginLeft: '10%' }}> {/* Displaying 1 column for xs screens and 3 columns for md screens */}
                    {vehicleData.map((vehicle) => (
                        <BuyNow key={vehicle.VIN} vehicle={vehicle} />
                    ))}
                </Row>
            </Container>
            <Container>
                <h2 style={{ marginTop: '5%', marginLeft: '10.5%' }} className='mb-3'>Popular Brands</h2>
                <BrandsList />
            </Container>

            <footer style={{ backgroundColor: '#212529', padding: '10px', textAlign: 'center' }}>
                <p>&copy; 2023 Handover. All rights reserved.</p>
            </footer>
        </>
    );
}

export default DealerSidebar;
