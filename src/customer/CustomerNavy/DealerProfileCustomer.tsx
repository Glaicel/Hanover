import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardGroup, Col, Container, Row } from "react-bootstrap"; // Import the Card component

interface DealerProfile {
    dealer_id: number;
    dealer_name: string;
    dealer_email: string;
    dealer_address: string;
    dealer_phone_number: string;
}

function DealerProfileCustomer() {
    const { dealerId } = useParams();
    const [dealerProfile, setDealerProfile] = useState<DealerProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchDealer = async () => {
        try {
            const response = await axios.get(`http://carfinity.test/api/dealer/profile/${dealerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Response:', response.data);
            setDealerProfile(response.data); // Assuming response.data contains the dealer profile
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dealer profile:', error);
            setError('Error fetching dealer profile');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDealer();
    }, [dealerId, token]);

    if (loading) {
        return <p>Loading dealer details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Container>
                <Row className="mt-5 ms-5">
                    <Col>
                        <CardGroup className="shadow-sm">
                            <Card className="border-0">
                                <Card.Body>
                                    <Card.Img src=""></Card.Img>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '60rem' }} className="border-0">
                                <Card.Body>
                                    <Card.Title>{dealerProfile?.dealer_name}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {dealerProfile?.dealer_email}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Address:</strong> {dealerProfile?.dealer_address}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Phone Number:</strong> {dealerProfile?.dealer_phone_number}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>

        </>

    );
}

export default DealerProfileCustomer;
