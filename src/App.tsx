// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './admin/AdminRoutes/AdminLogin'
import AdminDashboard from './admin/AdminRoutes/AdminDashboard';
import AdminOrder from './admin/AdminRoutes/AdminOrder';
import AdminProduct from './admin/AdminRoutes/AdminProducts';
import AdminStocks from './admin/AdminRoutes/AdminStockProduction';
import AdminSettings from './admin/AdminRoutes/AdminSettings';
import AdminProductDetails from './admin/AdminRoutes/AdminProuductDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-orders" element={<AdminOrder />} />
        <Route path='/admin-products' element={<AdminProduct />} />
        <Route path='/admin-stocks' element={<AdminStocks />} />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/admin-details' element={<AdminProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
