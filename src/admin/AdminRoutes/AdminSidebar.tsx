import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


function AdminSidebar() {
    return (
        <Nav defaultActiveKey="/admin/dashbord" className='flex-column'>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/dashboard">
                    Dashboard
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/product">
                    Product
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/product">
                    Product
                </Nav.Link>
            </Nav.Item>
        </Nav>

    );

}

export default AdminSidebar;