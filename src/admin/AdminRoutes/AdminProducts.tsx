import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import { Button, Card, Col, Dropdown, DropdownButton, Form, Modal, Row, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function AdminProduct() {
    const [showModal, setShowModal] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const token = localStorage.getItem('token');

    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const fetchVehicles = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/vehicle/show', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }


    useEffect(() => {

        fetchVehicles();
    }, []);


    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
                <Card style={{ width: '67rem' }} className='ms-3 mt-4 mb-4'>
                    <Card.Body>
                        <Button className='mt-2' onClick={handleShowModal}>
                            Add Product
                        </Button>
                        <Table className='mt-3' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>VIN</th>
                                    <th>Brand Name</th>
                                    <th>Model Name</th>
                                    <th>Color</th>
                                    <th>Engine Type</th>
                                    <th>Transmission Type</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((vehicle, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{vehicle.vin}</td>
                                        <td>{vehicle.brand_name}</td>
                                        <td>{vehicle.model_name}</td>
                                        <td>{vehicle.color}</td>
                                        <td>{vehicle.engine_type}</td>
                                        <td>{vehicle.transmission_type}</td>
                                        <td>{vehicle.price}</td>

                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col lg={12}>
                                        <Form.Group controlId="BrandName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter VIN"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="BrandName" className="mt-3">
                                            <Form.Select>
                                                <option>Select Brand</option>
                                                <option>Action</option>
                                                <option>Another action</option>
                                                <option>Something else</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="BrandName" className='mt-3'>
                                            <Form.Select>
                                                <option>Model Name</option>
                                                <option>Action</option>
                                                <option>Action</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group controlId="BrandName" className='mt-3'>
                                            <Form.Select>
                                                <option>Color</option>
                                                <option>Action</option>
                                                <option>Action</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group controlId="BrandName" className='mt-3'>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Price"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleCloseModal}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>

            </div>
        </div>
    );
}

export default AdminProduct;