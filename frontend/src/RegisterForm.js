import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        if (formData.password !== formData.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "Passwords do not match" });
        return;
        }
        try {
            const response = await axios.post('/api/auth/register', formData);
            setIsSubmitted(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data && typeof error.response.data === 'object') {
                    setErrors(error.response.data);
                } else {
                    setErrors({ form: 'An error occurred during registration. Please try again later.' });
                }
            } else {
                setErrors({ form: 'An unexpected error occurred. Please try again later.' });
            }
        }
    };

    const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
    };

     if (isSubmitted) {
            return (
                <div className="verification-page">
                  <div className="verification-container">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    <h2>Verify Your Email</h2>
                    <p>Please check your email for a link to verify your email address.</p>
                    <p>Once verified, you'll be able to sign in.</p>
                    <div className="login-prompt">
                      Already Verified? <Link to="/login">Sign In</Link>
                    </div>
                  </div>
                </div>
              );
            };

    return (
    <div className="register-page">
    <div className="welcome-section">
          <h1>Welcome to website</h1>
          <p>Welcome to our task management platform! Sign up now to unlock a seamless experience of organizing your tasks. Whether you need to schedule tasks for specific hours or coordinate group meetings, our intuitive interface has you covered. Whether you're a busy professional or someone managing personal projects, our platform is designed to simplify your task management process. Get started today and regain control over your schedule!</p>
      </div>
        <div className="register-container">
          <FontAwesomeIcon icon={faUser} size="2x" />
            <div className="register-header">Create your account</div>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        id="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    {errors.firstname && <div className="error-message">{errors.firstname}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        id="lastname"
                        type="text"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                    {errors.lastname && <div className="error-message">{errors.lastname}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="Username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-icon"
                            />
                        </div>
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                        <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="password-wrapper">
                            <input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="password-icon"
                        />
                        </div>
                        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                    </div>
                    {errors.form && <div className="error-message">{errors.form}
                </div>
                }
                <button type="submit" className="btn-submit">Register</button>
                <div className="login-prompt">
                Already have an account? <Link to="/login">Sign In</Link>
                </div>
                </form>
                <a href="http://www.freepik.com" className="background-credit">Background Designed by kjpargeter / Freepik</a>
            </div>
        </div>
    );
};

export default RegisterForm;
