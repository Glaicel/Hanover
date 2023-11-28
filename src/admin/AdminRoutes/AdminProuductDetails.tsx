import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import { Card, Nav } from 'react-bootstrap';

function AdminProductDetails() {
    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
                <Card style={{ width: '67rem' }} className='ms-4 mt-4 mb-4'>
                    <Card.Body>\
                        <Nav fill variant="tabs" defaultActiveKey="active">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Company</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">Brands</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3">Models</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-4">Model Options</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-5">Vehicle</Nav.Link>
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
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default AdminProductDetails;