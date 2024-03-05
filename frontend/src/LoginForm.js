import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errormessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/authenticate', { email, password });
            if (response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                setIsLoggedIn(true);
                navigate('/demo');
            } else if (response.data.message) {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("Wrong email or password!");
        }
    };

    return (
        <div className="login-page">
            <div className="welcome-section">
                <h1>Welcome to website</h1>
                <p>Welcome to our trading platform for cryptocurrencies and stocks! Log in here to gain access to a wide range of assets and start trading with ease. Whether you're a seasoned investor or just getting started, our user-friendly interface and comprehensive tools make it simple to buy and sell cryptocurrencies and stocks. Join us today and take control of your financial future.</p>
            </div>
            <div className="login-container">
                <FontAwesomeIcon icon={faUser} size="2x" />
                <h2 className="login-header">Sign in</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    {errormessage && <div className="error-message">{errormessage}</div>}
                    <div className="form-footer">
                        <button type="submit">Login</button>
                        <div className="signup-prompt">
                            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
                        </div>
                    </div>
                </form>
                <a href="http://www.freepik.com" className="background-credit">Background Designed by kjpargeter / Freepik</a>
            </div>
        </div>
    );
};

export default LoginForm;