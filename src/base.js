import axios from "axios";

export default axios.create({
    baseURL: `https://flight.foggystudio.com`,
    //baseURL: `http://localhost:8080`,
    withCredentials: true
});