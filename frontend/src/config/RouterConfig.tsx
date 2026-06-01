import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import SelectCategoryPage from '../pages/SelectCategoryPage';
import CreateVehiclePage from '../pages/CreateVehiclePage';

function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/select-category" element={<SelectCategoryPage />} />
            <Route path="/create-vehicle" element={<CreateVehiclePage />} />
        </Routes>
    )
}

export default RouterConfig