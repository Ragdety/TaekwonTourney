import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:5001/api/v1/identity'
});

export {}