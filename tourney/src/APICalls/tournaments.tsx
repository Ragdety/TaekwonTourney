import axios from 'axios';
import Cookies from "js-cookie";
export default axios.create({
    baseURL: 'https://localhost:5001/api/v1/tournaments/',
    headers: {
        Authorization: `Bearer ${ Cookies.get('jwt') }`
    }
});

export {}