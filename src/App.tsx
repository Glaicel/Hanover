// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './admin/AdminRoutes/AdminDashboard';
import AdminOrder from './admin/AdminRoutes/AdminPurchase';
import AdminProduct from './admin/AdminRoutes/AdminProducts';
import AdminStocks from './admin/AdminRoutes/AdminStockProduction';
import AdminSettings from './admin/AdminRoutes/AdminSettings';
import AdminProductDetails from './admin/AdminRoutes/AdminProuductDetails';
import DealerSidebar from './dealer/DealerNavy/DealerSideBar';
import Login from './routes/Login';
import LandingPage from './routes/Navbar';
import DealerOrder from './dealer/DealerRoutes/DealerOrder';
import Purchase from './dealer/DealerNavy/Purchases/Purchase';
import { AuthProvider } from './dealer/DealerNavy/Transaction/Auth'; // Replace with the actual path
import VehicleDetailsPage from './routes/VehicelDetails';
import DealerProfile from './dealer/DealerProfile/DealerProfile'
import DealerProducts from './dealer/DealerProducts/DealerProducts';
import CustomerPage from './customer/CustomerNavy/CustomerLandingPage';
import ProductDetails from './customer/CustomerNavy/ProductDetails';
import BrandModelsPage from './dealer/DealerNavy/ProductNavy/ModelList';
import BrandDetailsPage from './routes/BrandVehicles';
import CustomerPurchase from './customer/CustomerRoutes/CustomerPurchases';
import SoldProducts from './dealer/DealerNavy/Purchases/SoldProducts';
import DealerProfileCustomer from './customer/CustomerNavy/DealerProfileCustomer';



function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-orders" element={<AdminOrder />} />
          <Route path='/admin-products' element={<AdminProduct />} />
          <Route path='/admin-stocks' element={<AdminStocks />} />
          <Route path='/admin-settings' element={<AdminSettings />} />
          <Route path='/admin-details' element={<AdminProductDetails />} />
          <Route path='/dealer-dashboard' element={<DealerSidebar />} />
          <Route path='/dealer-order' element={<DealerOrder />} />
          <Route path='/dealer-product' element={<DealerOrder />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path="/vehicle-details/:id" element={<VehicleDetailsPage />} />
          <Route path='/dealer-profile' element={<DealerProfile />} />
          <Route path='/products' element={<DealerProducts />} />
          <Route path='/customer-page' element={<CustomerPage />} />
          <Route path="/product-details/:dealer_product_id" element={<ProductDetails />} />
          <Route path="/dealer-dashboard/brand/models/:brandId" element={<BrandModelsPage />} />
          <Route path="/brand/:brandId" element={<BrandDetailsPage />} />
          <Route path="/customer-purchase" element={<CustomerPurchase />} />
          <Route path="sold-products" element={<SoldProducts />} />
          <Route path="/Profile/:dealerId" element={<DealerProfileCustomer />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
