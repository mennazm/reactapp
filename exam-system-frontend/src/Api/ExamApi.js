import axios from 'axios';

const baseURL = 'http://localhost:8080'; 
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Fetch the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Helper function to set authentication token for requests
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to login user';
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to fetch users';
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to fetch user';
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to update user';
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to delete user';
  }
};

// Export the axios instance for advanced usage if needed
export default axiosInstance;
