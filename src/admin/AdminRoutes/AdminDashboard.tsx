import { Navbar, Container, Card, Row, Col, CardGroup } from 'react-bootstrap';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import '../styles/AdminDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminDashboard() {
    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <AdminSidebar />
                <Container>
                    <Navbar expand="lg" className="bg-white custom-nav shadow-sm">
                        <Container>
                            <Navbar.Brand href="#">Navbar</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <CardGroup className='group mt-3' style={{ width: '70rem', height: '10rem' }}>
                        <Card className='me-4 shadow-sm border-0 rounded'>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>

                            <Card.Body>

                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>

                            <Card.Body>

                            </Card.Body>
                        </Card>
                        <Card className='me-4 shadow-sm border-0 rounded'>

                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </CardGroup>
                    <Card className='mt-3 border-0 shadow-sm' style={{ marginLeft: '17%', width: '45rem', height: '24rem' }}>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                    <Card className=' border-0 shadow-sm best-sell' style={{ marginLeft: '72.5%', marginTop: '-28.5%', width: '22rem', height: '23.8rem' }}>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}

export default AdminDashboard;
