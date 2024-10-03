import axios from 'axios';

// Configure the base URL based on environment
const API_URL='http://localhost:3000/auth';

// Sign Up
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {withCredentials: true});
        return response;
    } catch (error) {
        handleError(error);
    }
};

// Login
export const login = async (userData) => {
    try {
        console.log("reached login", userData);
        
        const response = await axios.post(`${API_URL}/login`, userData, {withCredentials: true});

        console.log("authservice: ", response);
        
        return response;
    } catch (error) {
        handleError(error);
    }
};

//logout
export const logout = async () => {
    try {
        console.log("reached logout authservice");
        const res = await axios.get(`${API_URL}/logout`, {withCredentials: true} );
        console.log("response from logout", res);
        return res;
        
    } catch (error) {
        handleError(error);
        
    }
     
};

//Check Auth
export const checkAuth = async () => {
    try {
        console.log("reached check Auth");
        const res = await axios.get(`${API_URL}/check-auth`, {withCredentials: true});

        console.log("res: ",res);
        
        return res;
        
    } catch (error) {
        handleError(error);
        
    }
}

// Error handling function
const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
    }
    throw new Error(error.response ? error.response.data.msg : 'An error occurred');
};
