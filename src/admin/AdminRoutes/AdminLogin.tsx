// Login.js
import { Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-primary">
            <Card className="text-center" style={{ width: '300px' }}>
                <Card.Body>
                    <Card.Title className="text-white">Login</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Control type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Link to="/admin-dashboard">
                            <Button variant="light" type="submit" className="w-100 mt-3">
                                Login
                            </Button>
                        </Link>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
