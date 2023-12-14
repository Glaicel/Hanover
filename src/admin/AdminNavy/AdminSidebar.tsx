
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/AdminSidebar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function AdminSidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    };

    return (
        <>
            <div className='bg-white col-md-2 vh-100 shadow-sm bg-white rounded justify-content-between flex-column'>
                <a className='text-decoration-none text-black d-flex align-itemcenter'>
                    <span className='ms-1 fs-4 mt-4'>Hanover</span>
                </a>
                <ul className="nav nav-pills flex-column mt-3 mt-sm=0">
                    <li className="fs-4 my-1 py-2 py-sm-0">
                        <NavLink to="/admin-dashboard" className="nav-link text-black fs-5" aria-current="page">
                            <i className='bi bi-house-door item'></i>
                            <span className='ms-2 item'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="fs-4 my-1 py-2 py-sm-0 mt-3">
                        <NavLink to="/admin-orders" className="nav-link text-black fs-5" aria-current="page">
                            <i className='bi bi-cart item'></i>
                            <span className='ms-2 item'>Purchase</span>
                        </NavLink>
                    </li>
                    <li className="nav-item text-black fs-4 mt-4">
                        <NavLink to="/admin-products" className="nav-link text-black fs-5" aria-current="page">
                            <i className='bi bi-box item'></i>
                            <span className='ms-2 item'>Products</span>
                        </NavLink>
                    </li>
                    <li className="nav-item text-black fs-4 mt-4">
                        <NavLink to="/admin-details" className="nav-link text-black fs-5" aria-current="page">
                            <i className="bi bi-people item"></i>
                            <span className='ms-2 item'>Product Details</span>
                        </NavLink>
                    </li>
                    <li className="nav-item text-black fs-4 mt-4">
                        <NavLink to="/admin-stocks" className="nav-link text-black fs-5" aria-current="page">
                            <i className="bi bi-graph-up-arrow item"></i>
                            <span className='ms-2 item'>Stocks</span>
                        </NavLink>
                    </li>
                    <li className="nav-item text-black fs-4 mt-4">
                        <button className="nav-link text-black fs-5" onClick={handleLogout}>
                            <i className="bi bi-box item"></i>
                            <span className='ms-2 item'>Sign Out</span>
                        </button>
                    </li>
                    <li className="nav-user text-black fs-4">
                        <Link to="" className="nav-link text-black fs-5" aria-current="page">
                            <i className="bi bi-person-circle"></i>
                            <span className='ms-2 item'>Admin</span>
                        </Link>
                    </li>
                </ul>

            </div>
        </>

    )
}

export default AdminSidebar