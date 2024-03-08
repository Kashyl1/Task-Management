import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import DemoPage from './DemoPage';
import Verification from './Verification';
import RegisterForm from './RegisterForm';
import TaskFormAdd from './TaskFormAdd';
import TasksList from './TasksList';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileImageDelete from './ProfileImageDelete';
import ProfileImage from './ProfileImage';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './DashboardPage';
import AboutPage from './AboutPage';
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
    const [userData, setUserData] = useState({profileImageUrl: ''});
    const [shouldRefreshTasks, setShouldRefreshTasks] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsLoggedIn(!!token);
        if (token) {
            fetchUserData();
        }
    }, []);

    useEffect(() => {
          if (isLoggedIn) {
            fetchUserData();
          } else {
            setUserData({ profileImageUrl: '' });
          }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setUserData({});
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const response = await axios.get('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error with user's data", error);
            }
        }
    };

    const refreshUserData = () => {
        fetchUserData();
    };

    return (
        <Router>
            <div className="App">
                    <nav className="App-nav">
                        {isLoggedIn &&
                            <>
                                <Link to="/app" className="nav-link">Tasks</Link>
                                <Link to="/about" className="nav-link">About</Link>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                                <ProfileImage imageUrl={userData.profileImageUrl} firstname={userData.firstname} lastname={userData.lastname}/>
                            </>}
                    </nav>
                <Routes>
                    <Route path="/login" element={!isLoggedIn ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <Navigate replace to="/app" />} />
                    <Route path="/register" element={!isLoggedIn ? <RegisterForm /> : <Navigate replace to="/app" />} />
                    <Route path="/verify" element={<Verification />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={!isLoggedIn ? <Navigate replace to="/login" /> : <Navigate replace to="/app" />} />
                    <Route path="/app" element={<ProtectedRoute isLoggedIn={isLoggedIn}><DashboardPage refreshUserData={refreshUserData} userData={userData} shouldRefreshTasks={shouldRefreshTasks} setShouldRefreshTasks={setShouldRefreshTasks}/></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;