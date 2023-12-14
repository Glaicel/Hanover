import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import { Button, Card, Dropdown, DropdownButton, Form, Modal, Nav, Tab, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Company from '../AdminRoutes/ProductDetails/Company';
import Brand from './ProductDetails/Brands';

interface VehicleType {
    id: number; // Adjust the type according to the actual structure of your data
    vehicle_type: string;
    image_path: string; // Adjust the type according to the actual structure of your data
}

function AdminProductDetails() {
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showModelModal, setShowModelModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [showPartsModal, setShowPartsModal] = useState(false);
    const [showPlantsModal, setShowPlantsModal] = useState(false);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [parts, setParts] = useState([]);
    const [plants, setPlants] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchVehicleTypes();
        fetchModels();
        fetchBrands();
        fetchParts();
        fetchPlants();
        fetchSupplier();
    }, []);

    const fetchVehicleTypes = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/vehicle/type/select', {
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
            setVehicleTypes(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    };

    const fetchModels = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/model/show', {
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
            setModels(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }

    const fetchBrands = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/brand/select', {
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
            setBrands(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }

    const fetchParts = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/part/select', {
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
            setParts(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }

    const fetchPlants = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/plant/select', {
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
            setPlants(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }
    const fetchSupplier = async () => {
        try {
            const response = await fetch('http://carfinity.test/api/supplier/select', {
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
            setSuppliers(data);
        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    }



    const handleShowModelModal = () => {
        setShowModelModal(true);
    }
    const handleShowOptionsModal = () => {
        setShowOptionsModal(true);
    }
    const handleShowVehicleModal = () => {
        setShowVehicleModal(true);
    }
    const handleShowPartsModal = () => {
        setShowPartsModal(true);
    }
    const handleShowPlantsModal = () => {
        setShowPlantsModal(true);
    }
    const handleShowSupplierModal = () => {
        setShowSupplierModal(true);
    }

    //close

    const handleCloseCompanyModal = () => {
        setShowCompanyModal(false);
    };
    const handleCloseBrandModal = () => {
        setShowBrandModal(false);
    };
    const handleCloseModelModal = () => {
        setShowModelModal(false);
    }
    const handleCloseOptionsModal = () => {
        setShowOptionsModal(false);
    }
    const handleCloseVehicleModal = () => {
        setShowVehicleModal(false);
    }
    const handleClosePartsModal = () => {
        setShowPartsModal(false);
    }
    const handleClosePlantsModal = () => {
        setShowPlantsModal(false);
    }

    const handleCloseSupplierModal = () => {
        setShowSupplierModal(false);
    }


    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
                <Card style={{ width: '67rem' }} className='ms-4 mt-4 mb-4'>
                    <Card.Body>
                        <Tab.Container defaultActiveKey="link-1">
                            <Nav fill variant="tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1">Company</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-2">Brands</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-5">Vehicle</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-3">Models</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link eventKey="link-6">Parts</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-7">Plants</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-8">Supplier</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="link-1">
                                    <Company />
                                </Tab.Pane>
                                <Tab.Pane eventKey="link-2">
                                    {/* Content for Brands tab */}
                                    <Brand />
                                </Tab.Pane>
                                <Tab.Pane eventKey="link-5">
                                    <Button className='mt-4' onClick={handleShowVehicleModal}>Add Vehicle</Button>
                                    <Table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Vehicle Type</th>
                                                <th>Vehicle Image</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vehicleTypes.map((vehicleType, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{vehicleType.vehicle_type}</td>
                                                    <td>
                                                        <img src={vehicleType.image_path} style={{ width: '100px', height: '50px' }} />
                                                    </td>
                                                    <td>
                                                        <Button variant="info" >
                                                            Edit
                                                        </Button>{' '}
                                                        <Button variant="danger">
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="link-3">
                                    <Button className='mt-4' onClick={handleShowModelModal}>Add Model</Button>
                                    <Table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Model Name</th>
                                                <th>Model Image</th>
                                                <th>Brand Name</th>
                                                <th>Vehicle Type</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {models.map((model, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{model.model_name}</td>
                                                    <td>
                                                        <img src={model.image_path} style={{ width: '100px', height: '50px' }} />
                                                    </td>
                                                    <td>{model.brand_name}</td>
                                                    <td>{model.vehicle_type}</td>

                                                </tr>

                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>

                                <Tab.Pane eventKey="link-6">
                                    <Button className='mt-4' onClick={handleShowPartsModal}>Add Parts</Button>
                                    <Table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Part Name</th>
                                                <th>Part Image</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parts.map((part, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{part.parts_name}</td>
                                                    <td>
                                                        <img src={part.image_path} style={{ width: '100px', height: '50px' }} />
                                                    </td>
                                                    <td>{part.price}</td>
                                                    <td>{part.availability}</td>

                                                </tr>

                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="link-7">
                                    <Button className='mt-4' onClick={handleShowPlantsModal}>Add Plants</Button>
                                    <Table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Plant Name</th>
                                                <th>location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {plants.map((plant, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{plant.plant_name}</td>
                                                    <td>{plant.location}</td>

                                                </tr>

                                            ))}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="link-8">
                                    <Button className='mt-4' onClick={handleShowSupplierModal}>Add Supplier</Button>
                                    <Table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Supplier Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {suppliers.map((supplier, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{supplier.supplier_name}</td>
                                                </tr>

                                            ))}
                                        </tbody>

                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>

                            <Modal show={showCompanyModal} onHide={handleCloseCompanyModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Company</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="CompanyName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter company name"

                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyAddress">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter company address"

                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseCompanyModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseCompanyModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showBrandModal} onHide={handleCloseBrandModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Brand</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="BrandName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Brand name"

                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyImage">
                                            <div className="mb-3">
                                                <input type="file" className="form-control" id="imageInput" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="CompanyName">
                                            <DropdownButton id="dropdown-basic-button" title="Choose Company" variant="light">
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </DropdownButton>

                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseBrandModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseBrandModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showVehicleModal} onHide={handleCloseVehicleModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Vehicle Type</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='mt-3' controlId="CompanyName">
                                            <Form.Select title="Select Vehicle Type">
                                                {vehicleTypes.map(vehicleType => (
                                                    <option key={vehicleType.id} value={vehicleType.id}>
                                                        {vehicleType.vehicle_type} {/* Assuming the vehicle type has a 'name' property */}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyImage">
                                            <div className="mb-3">
                                                <input type="file" className="form-control" id="imageInput" />
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseVehicleModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseVehicleModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showModelModal} onHide={handleCloseModelModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Model</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="companyName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Model Name"
                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyImage">
                                            <div className="mb-3">
                                                <input type="file" className="form-control" id="imageInput" />
                                            </div>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="CompanyName">
                                            <Form.Select title="Select Vehicle Type">
                                                {brands.map(brand => (
                                                    <option key={brand.brand_id} value={brand.brand_id}>
                                                        {brand.brand_name} {/* Assuming the vehicle type has a 'name' property */}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="ModelName">
                                            <Form.Select title="Select Vehicle Type">
                                                {vehicleTypes.map(vehicleType => (
                                                    <option key={vehicleType.id} value={vehicleType.id}>
                                                        {vehicleType.vehicle_type} {/* Assuming the vehicle type has a 'name' property */}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModelModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseModelModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showOptionsModal} onHide={handleCloseOptionsModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Model Options</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='mt-3' controlId="ModelName">
                                            <DropdownButton id="dropdown-basic-button" title="Color" variant="light">
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </DropdownButton>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="ModelName">
                                            <DropdownButton id="dropdown-basic-button" title="Engine" variant="light">
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </DropdownButton>
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="ModelName">
                                            <DropdownButton id="dropdown-basic-button" title="Transmission Type" variant="light">
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </DropdownButton>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseOptionsModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseOptionsModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showPartsModal} onHide={handleClosePartsModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Part</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="companyName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter company name"
                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyImage">
                                            <div className="mb-3">
                                                <input type="file" className="form-control" id="imageInput" />
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClosePartsModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClosePartsModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showPlantsModal} onHide={handleClosePlantsModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Plant</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="companyName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Plants name"
                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyAddress">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Location"
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClosePlantsModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClosePlantsModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal show={showSupplierModal} onHide={handleCloseSupplierModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Supplier</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="companyName">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Supplier name"
                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyAddress">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter phone number"
                                            />
                                        </Form.Group>
                                        <Form.Group className='mt-3' controlId="companyAddress">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Address"
                                            />
                                        </Form.Group>

                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseSupplierModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCloseSupplierModal}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Tab.Container>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default AdminProductDetails;