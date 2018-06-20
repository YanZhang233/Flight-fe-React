import axios from "axios";

export default axios.create({
    //baseURL: `http://flight.zhuo9529.com`,
    baseURL: `https://flight.foggystudio.com`,
    //baseURL: `http://localhost:8080`,
    withCredentials: true
});