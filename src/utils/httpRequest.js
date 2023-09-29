import axios from "axios";

let url = process.env.REACT_APP_URL;

const httpRequest = axios.create({
    baseURL: `${url}/api/`,
});

export default httpRequest;
