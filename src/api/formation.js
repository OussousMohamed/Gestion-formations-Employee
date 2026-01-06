import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8585/formations',  
    timeout: 10000,
});