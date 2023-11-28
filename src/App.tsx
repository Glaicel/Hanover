import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './routes/Navbar'
import Login from './routes/Login'
import SignUp from './routes/SignUp'


function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
