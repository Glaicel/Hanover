import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';
import { Card } from 'react-bootstrap';

function AdminStocks() {
    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
                <Card style={{ width: '60rem' }} className='ms-5 mt-4 mb-4'>
                    <Card.Body>

                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default AdminStocks;