
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../styles/AdminSidebar.css'
import { Link, NavLink } from 'react-router-dom'

function AdminSidebar() {

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
                            <span className='ms-1 d-none d-sm-inline item'>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="fs-4 my-1 py-2 py-sm-0">
                        <NavLink to="/admin-orders" className="nav-link text-black fs-5" aria-current="page">
                            <i className='bi bi-sort-up item'></i>
                            <span className='ms-2 item'>Orders</span>
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
                            <i className="bi bi-box item"></i>
                            <span className='ms-2 item'>Stocks</span>
                        </NavLink>
                    </li>
                    <li className="nav-item text-black fs-4 mt-4">
                        <NavLink to="/admin-settings" className="nav-link text-black fs-5" aria-current="page">
                            <i className="bi bi-gear item"></i>
                            <span className='ms-2 item'>Settings</span>
                        </NavLink>
                    </li>
                    <li className="nav-user text-black fs-4">
                        <Link to="" className="nav-link text-black fs-5" aria-current="page">
                            <i className="bi bi-person-circle"></i>
                        </Link>
                    </li>
                </ul>

            </div>
        </>

    )
}

export default AdminSidebar