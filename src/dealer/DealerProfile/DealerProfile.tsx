import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import DealerNavbar from '../DealerNavy/DealerNavbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { DealerProducts } from '../DealerProducts/DealerProducts';
import { useNavigate } from 'react-router-dom';


interface Profile {
    user_id: number;
    name: string;
    email: string;
    role: string;
    address: string;
    phone_number: string;
    profileImage: string;
}


const Profile: React.FC = () => {
    const [userData, setUserData] = useState<Profile | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [dealerProducts, setDealerProducts] = useState<DealerProducts[]>([]);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Profile>('http://carfinity.test/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDealerProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<DealerProducts[]>('http://carfinity.test/api/dealer-products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDealerProducts(response.data);
        } catch (error) {
            console.error('Error fetching dealer products:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchDealerProducts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedImage(files[0]);
        }
    };

    const handleEditProfile = async () => {
        try {
            const token = localStorage.getItem('token');

            // Create a FormData object to send files
            const formData = new FormData();

            // If an image is selected, append it to the FormData object
            if (selectedImage) {
                formData.append('profile_image', selectedImage);
            }

            // Append other updated user information as needed
            formData.append('name', 'Updated Name');

            // Make a POST request to upload the image and update user information
            await axios.post(`http://carfinity.test/api/user/upload-image/${userData?.user_id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Fetch user data again to reflect the changes
            await fetchUserData();
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return (
        <div>
            <DealerNavbar onLogout={handleLogout} />
            <h2 className='mt-3' style={{ marginLeft: '16%' }}>Profile</h2>
            <CardGroup className='mt-3 shadow-lg rounded' style={{ width: '60rem', height: '20rem', marginLeft: '15%' }}>
                <Card className="border-0">
                    <Card.Body>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {selectedImage && (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                style={{ maxWidth: '45%', marginTop: '4px', marginLeft: '25%', borderRadius: '50%' }}
                            />
                        )}
                        {userData?.profileImage && !selectedImage && (
                            <img
                                src={userData.profileImage}
                                alt="Profile"
                                style={{ maxWidth: '100%', marginTop: '10px', borderRadius: '50%' }}
                            />
                        )}

                    </Card.Body>
                </Card>
                <Card className="border-0">
                    <Card.Body className='mt-5'>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : userData ? (
                            <div>
                                <p>{userData.name}</p>
                                <p>{userData.email}</p>
                                <p>{userData.role}</p>
                                {/* Add more user information fields as needed */}
                            </div>
                        ) : (
                            <p>No user data available.</p>
                        )}
                        <Button variant="primary" onClick={handleEditProfile}>
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Profile
                        </Button>
                    </Card.Body>
                </Card>
            </CardGroup>
            <Container style={{ marginLeft: "14%" }}>
                <h3 className='mt-3 mb-3'>My Products</h3>
                <CardGroup style={{ width: '61rem' }} className='mt-3 mb-3'>
                    <Row xs={1} md={3} className='g-4'>
                        {dealerProducts.map((product) => (
                            <Col key={product.dealer_product_id}>
                                <Card className='me-3'>
                                    <Card.Img variant='top' src={product.image_path} />
                                    <Card.Body>
                                        <Card.Title>{product.brand_name}</Card.Title>
                                        <Card.Text>
                                            {product.model_name} - {product.color}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className='text-muted'>Price: ${product.selling_price}</small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </CardGroup>
            </Container>
        </div>
    );
};

export default Profile;
