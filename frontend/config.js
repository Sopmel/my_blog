import axios from 'axios';

const backendURL = process.env.NODE_ENV === 'production' ? 'https://my-blog-h7wn.onrender.com' : 'http://localhost:3000';

const axiosRequest = axios.create({
    baseURL: backendURL,
    withCredentials: true 
});

const fetchData = async (url, options) => {
    try {
        const response = await fetch(`${backendURL}${url}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch request error:', error);
        throw error;
    }
};

export { axiosRequest, fetchData };
