import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import DemoPage from './DemoPage';
import Verification from './Verification';
import RegisterForm from './RegisterForm';
import TaskForm from './TaskForm';
import TasksList from './TasksList';
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
    const [userData, setUserData] = useState({});
    const [shouldRefreshTasks, setShouldRefreshTasks] = useState(false);


    useEffect(() => {
            const token = localStorage.getItem('jwtToken');
            setIsLoggedIn(!!token);
            if (token) {
                fetchUserData();
            }
    }, []);

    const handleLogout = () => {
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
            setUserData({});
            window.location.href = '/login';
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
                    console.log(response.data);
                    setUserData(response.data);
                } catch (error) {
                    console.error("Error with user's data", error);
                }
            }
        };

    return (
            <Router>
                <div className="App">
                    <nav>

                        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                        {isLoggedIn && <Link to="/demo">Demo</Link>}
                        {isLoggedIn && (
                            <div>
                                   <TaskForm onSuccess={() => setShouldRefreshTasks(prev => !prev)} />
                                   <TasksList shouldRefreshTasks={shouldRefreshTasks} />
                            </div>

                        )}
                        {isLoggedIn && (
                            <div>
                                <TasksList />
                            </div>
                        )}
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