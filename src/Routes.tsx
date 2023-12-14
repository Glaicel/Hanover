import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import LandingPage from './routes/Navbar';

function Routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Routes;