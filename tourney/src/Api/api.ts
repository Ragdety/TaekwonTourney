import axios from 'axios';

export default axios.create({
    //This should be in env variables for when we release in prod
    baseURL: 'https://localhost:5001/api/v1/',
    headers: {
        "Content-type": "application/json"
    }
});