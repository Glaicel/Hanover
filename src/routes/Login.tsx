
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup, Container, Form, Row } from 'react-bootstrap';
import '../styles/Login.css'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function Login() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container>
            <Row className='mt-5'>
                <CardGroup className='mt-5 shadow-lg mb-5 rounded p-0'>
                    <Card style={{ width: '35rem', height: '28rem', border: 'none' }}>
                        <Card.Body className='p-0'>
                            <img src='src/assets/login3.jpg' alt='logo' className='img-fluid' style={{ marginBottom: '20%', width: '32rem', height: '30rem' }} />
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '20rem', height: '30rem', border: 'none', backgroundColor: '#0D6EFD' }}>
                        <Card.Body className='top'>
                            <Card border="light" style={{ width: '25rem', height: '20rem', backgroundColor: '#1180f2' }}>
                                <Card.Body className='text-center text-white'>
                                    <h3>Login</h3>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <InputGroup className="mb-3 mt-5 custom">
                                            <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faUser} style={{ color: '#0D6EFD' }} /></InputGroup.Text>
                                            <Form.Control
                                                placeholder="Username"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid" className='text-white'>
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup className="mb-3 custom">
                                            <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faLock} style={{ color: '#0D6EFD' }} /></InputGroup.Text>
                                            <Form.Control
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid" className='text-white'>
                                                Please provide a password.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <Button variant="light" className="custom-button1" type="submit">Login</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Row>
        </Container>
    );
}

export default Login;

