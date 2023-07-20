import httpRequest from "../utils/httpRequest";

const postLoginApi = async (data) => {
    let res = await httpRequest.post(`login`, data);
    return res;
};

const getAllUserApi = async () => {
    let res = await httpRequest.get("get-all-user");
    return res;
};

const getAllCodeApi = async (type) => {
    let res = await httpRequest.get(`get-all-code?type=${type}`);
    return res;
};

const postUserApi = async (data) => {
    let res = await httpRequest.post(`create-user`, data);
    return res;
};

const deleteUserApi = async (id) => {
    let res = await httpRequest.post(`delete-user?id=${id}`);
    return res;
};

const getUserByIdApi = async (id) => {
    let res = await httpRequest.get(`get-user-by-id?id=${id}`);
    return res;
};

const editUserApi = async (data) => {
    let res = await httpRequest.put(`edit-user`, data);
    return res;
};

export {
    postLoginApi,
    getAllUserApi,
    getAllCodeApi,
    postUserApi,
    deleteUserApi,
    editUserApi,
    getUserByIdApi,
};
