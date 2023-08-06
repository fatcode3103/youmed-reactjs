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

const getAllDoctorApi = async () => {
    let res = await httpRequest.get(`get-all-doctor`);
    return res;
};

const getDoctorByIdApi = async (doctorId) => {
    let res = await httpRequest.get(`get-doctor-by-id?doctorId=${doctorId}`);
    return res;
};

const postDoctorInfoByIdApi = async (data) => {
    let res = await httpRequest.post(`post-doctor-info-by-id`, data);
    return res;
};

const getDoctorDetailInfoApi = async (id) => {
    let res = await httpRequest.get(`get-doctor-detail-info?id=${id}`);
    return res;
};

const putDoctorDetailInfoApi = async (data) => {
    let res = await httpRequest.put(`update-doctor-detail-info`, data);
    return res;
};

const postDoctorScheduleApi = async (data) => {
    let res = await httpRequest.post(`post-doctor-schedule`, data);
    return res;
};

const getDoctorScheduleApi = async (data) => {
    let res = await httpRequest.get(
        `get-doctor-schedule?date=${data.date}&doctorId=${data.doctorId}`
    );
    return res;
};

const getDoctorScheduleByIdApi = async (id) => {
    let res = await httpRequest.get(`get-doctor-schedule-by-id?id=${id}`);
    return res;
};

const updateDoctorScheduleApi = async (data) => {
    let res = await httpRequest.put(`update-doctor-schedule`, data);
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
    getAllDoctorApi,
    getDoctorByIdApi,
    postDoctorInfoByIdApi,
    getDoctorDetailInfoApi,
    putDoctorDetailInfoApi,
    postDoctorScheduleApi,
    getDoctorScheduleApi,
    updateDoctorScheduleApi,
    getDoctorScheduleByIdApi,
};
