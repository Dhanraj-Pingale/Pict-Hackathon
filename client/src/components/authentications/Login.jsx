import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../../Routes/authService';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setLogin } = useAuth();

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

    try {
      if (!formData.username || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const res = await login(formData);

      if (res.status === 200) {
        setLogin(res.data);
        return navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm p-8 m-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-center mx-auto mb-6">
          <img className="w-auto h-10" src="https://merakiui.com/images/logo.svg" alt="Logo" />
        </div>

        <h2 className="text-3xl font-semibold text-center text-white">Login to CodeLabX</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Enter Email
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <Link to="#" className="text-xs text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              placeholder="****"
              required
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:bg-blue-500 focus:outline-none transition-all duration-200"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-6">
          <span className="w-1/5 border-b border-gray-600"></span>
          <Link to="#" className="text-xs text-gray-500 uppercase hover:underline">
            or login with Social Media
          </Link>
          <span className="w-1/5 border-b border-gray-600"></span>
        </div>

        <div className="flex items-center mt-6">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 mx-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 focus:bg-red-500 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>
            Sign in with Google
          </button>

          <Link
            to="#"
            className="p-2 mx-2 text-sm font-medium text-gray-300 transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-gray-500"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-gray-200 hover:underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;