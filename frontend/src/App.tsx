import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCarPage from './pages/CreateCarPage';
import CarDetailPage from './pages/CarDetailPage';
import MyCarsPage from './pages/MyCarsPage';
import EditCarPage from "./pages/EditCarPage.tsx";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create-car" element={<CreateCarPage />} />
                <Route path="/my-cars" element={<MyCarsPage />} />
                <Route path="/cars/:id" element={<CarDetailPage />} />
                <Route path="/cars/:id/edit" element={<EditCarPage />} />
            </Routes>
        </Router>
    );
}

export default App;