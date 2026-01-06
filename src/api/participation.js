import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/participations",
    timeout: 10000,
});