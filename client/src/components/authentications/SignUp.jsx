import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../Routes/authService';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            const res = await signup(formData);
            setSuccessMessage('User registered successfully!');
            navigate('/');
        } catch (err) {
            setError(err.response ? err.response.data.error : 'An error occurred');
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex justify-center">
                    <img className="w-10 h-10" src="https://merakiui.com/images/logo.svg" alt="Logo" />
                </div>
                <h2 className="text-center text-3xl font-bold text-white">Create Your Account</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="relative">
                        <label htmlFor="username" className="sr-only">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Error/Success Messages */}
                    {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
