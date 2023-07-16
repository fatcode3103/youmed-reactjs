import axios from "axios";

const getUserApi = async () => {
    let res = await axios.get(`http://localhost:8000/api/get-name-user`);
    return res;
};

const postLoginApi = async (data) => {
    let res = await axios.post(`http://localhost:8000/api/login`, data);
    return res;
};

export { getUserApi, postLoginApi };
