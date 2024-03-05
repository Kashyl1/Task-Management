
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import DemoPage from './DemoPage';
import Verification from './Verification';
import RegisterForm from './RegisterForm';
import axios from 'axios';


import './App.css';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
            const token = localStorage.getItem('jwtToken');
            setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
            window.location.href = '/login';
    };

    return (
            <Router>
                <div className="App">
                    <nav>

                        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                        {isLoggedIn && <Link to="/demo">Demo</Link>}
                    </nav>
                    <Routes>
                        <Route path="/verify" element={<Verification />} />
                        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/demo" element={<DemoPage />} />
                    </Routes>
                </div>
            </Router>
    );
}

export default App;