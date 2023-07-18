import httpRequest from "../utils/httpRequest";

const getUserApi = async () => {
    let res = await httpRequest.get(`get-name-user`);
    return res;
};

const postLoginApi = async (data) => {
    let res = await httpRequest.post(`login`, data);
    return res;
};

export { getUserApi, postLoginApi };
