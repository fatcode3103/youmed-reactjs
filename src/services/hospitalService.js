import httpRequest from "../utils/httpRequest";

const creatHospitalApi = async (data) => {
    let res = await httpRequest.post(`post-hospital`, data);
    return res;
};

const getAllHospitalApi = async () => {
    let res = await httpRequest.get(`get-all-hospital`);
    return res;
};

const createHospitalDetailApi = async (data) => {
    let res = await httpRequest.post(`post-hospital-detail`, data);
    return res;
};

const updateHospitalDetailApi = async (data) => {
    let res = await httpRequest.put(`update-hospital-detail`, data);
    return res;
};

const createHospitalSpecialtylApi = async (data) => {
    let res = await httpRequest.post(`post-hospital-specialty`, data);
    return res;
};

const getHospitalByIdApi = async (hospitalId) => {
    let res = await httpRequest.get(
        `get-hospital-by-id?hospitalId=${hospitalId}`
    );
    return res;
};

const getHospitalSpecialtyByIdApi = async (hospitalId) => {
    let res = await httpRequest.get(
        `get-hospital-specialty-by-id?hospitalId=${hospitalId}`
    );
    return res;
};

const createHospitalScheduleApi = async (data) => {
    let res = await httpRequest.post(`create-hospital-schedule`, data);
    return res;
};

const getHospitalScheduleApi = async (data) => {
    let res = await httpRequest.get(
        `get-hospital-schedule?date=${data.date}&hospitalId=${data.hospitalId}`
    );
    return res;
};

const updateHospitalScheduleApi = async (data) => {
    let res = await httpRequest.put(`update-hospital-schedule`, data);
    return res;
};

const getHospitalScheduleByIdApi = async (hospitalId) => {
    let res = await httpRequest.get(
        `get-hospital-schedule-by-id?hospitalId=${hospitalId}`
    );
    return res;
};

export {
    creatHospitalApi,
    getAllHospitalApi,
    createHospitalDetailApi,
    createHospitalSpecialtylApi,
    getHospitalByIdApi,
    getHospitalSpecialtyByIdApi,
    updateHospitalDetailApi,
    createHospitalScheduleApi,
    getHospitalScheduleApi,
    updateHospitalScheduleApi,
    getHospitalScheduleByIdApi,
};
