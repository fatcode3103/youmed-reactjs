import httpRequest from "../utils/httpRequest";

const createSpecialtyApi = async (data) => {
    let res = await httpRequest.post(`post-specialty`, data);
    return res;
};

const getAllSpecialtyApi = async () => {
    let res = await httpRequest.get(`get-all-specialty`);
    return res;
};

const createDoctorSpecialtyApi = async (data) => {
    let res = await httpRequest.post(`post-doctor-specialty`, data);
    return res;
};

export { createSpecialtyApi, getAllSpecialtyApi, createDoctorSpecialtyApi };
