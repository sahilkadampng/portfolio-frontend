import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Solutions from './pages/Solutions'
import Docs from './pages/Docs'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import { useVisitorTracker } from './hooks/useVisitorTracker'

function AppRoutes() {
    useVisitorTracker();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

