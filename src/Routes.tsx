import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Routes path="/login" element={<></>}>

                </Routes>
            </Routes>
        </BrowserRouter>
    );
}