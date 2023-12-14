import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardGroup, Container, Form, FormSelect, Row } from 'react-bootstrap';
import '../styles/Login.css'
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate(); // Use the useNavigation hook
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post('http://carfinity.test/api/login', {
                email,
                password,
                role,
            });

            // Handle the response as needed
            console.log(response.data);

            const token = response.data.token;
            localStorage.setItem('token', token);

            // Use the selected role to determine the redirect path
            const redirectPath = {
                admin: '/admin-dashboard',
                dealer: '/dealer-dashboard',
                customer: '/customer-page',
            }[role] || '/';

            navigate(redirectPath);

        } catch (error) {
            // Handle login error
            console.error('Login failed', error);
            toast.error('Invalid credentials. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Row className='mt-5'>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

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
                                    <Form onSubmit={handleLogin}>
                                        <InputGroup className="mb-3 mt-5 custom">
                                            <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faUser} style={{ color: '#0D6EFD' }} /></InputGroup.Text>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                aria-label="Email"
                                                aria-describedby="basic-addon1"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3 custom">
                                            <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faLock} style={{ color: '#0D6EFD' }} /></InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                aria-label="Password"
                                                aria-describedby="basic-addon1"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3 custom">
                                            <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faLock} style={{ color: '#0D6EFD' }} /></InputGroup.Text>
                                            <FormSelect
                                                aria-label="Role"
                                                aria-describedby="basic-addon1"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="dealer">Dealer</option>
                                                <option value="customer">Customer</option>
                                            </FormSelect>
                                        </InputGroup>
                                        {loading ? (
                                            <div className="text-center">
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button variant="light" className="custom-button1" type="submit">Login</Button>
                                        )}
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
