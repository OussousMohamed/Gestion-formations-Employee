import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:5005/employes',
    timeout:10000,
})