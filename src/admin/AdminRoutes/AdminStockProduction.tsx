import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminSidebar from '../AdminNavy/AdminSidebar';

function AdminStocks() {
    return (
        <div className="ms-3 bg-light">
            <div className='row'>
                <AdminSidebar />
            </div>
        </div>
    );
}

export default AdminStocks;