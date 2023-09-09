import httpRequest from "../utils/httpRequest";

const createClinicApi = async (data) => {
    let res = await httpRequest.post(`create-clinic`, data);
    return res;
};

const getAllClinicApi = async (limit) => {
    let res = await httpRequest.get(`get-all-clinic?limit=${limit}`);
    return res;
};

const getClinicByIdApi = async (clinicId) => {
    let res = await httpRequest.get(`get-clinic-by-id?clinicId=${clinicId}`);
    return res;
};

const createClinicSpecialtyApi = async (data) => {
    let res = await httpRequest.post(`create-clinic-specialty`, data);
    return res;
};

const createClinicDetailApi = async (data) => {
    let res = await httpRequest.post(`create-clinic-detail`, data);
    return res;
};

const updateClinicDetailApi = async (data) => {
    let res = await httpRequest.put(`update-clinic-detail`, data);
    return res;
};

const createClinicScheduleApi = async (data) => {
    let res = await httpRequest.post(`create-clinic-schedule`, data);
    return res;
};

const getClinicScheduleApi = async ({ clinicId, date }) => {
    let res = await httpRequest.get(
        `get-clinic-schedule?date=${date}&clinicId=${clinicId}`
    );
    return res;
};

const updateClinicScheduleByIdApi = async (data) => {
    let res = await httpRequest.put(`update-clinic-schedule-by-id`, data);
    return res;
};

const getClinicScheduleByIdApi = async (clinicId) => {
    let res = await httpRequest.get(
        `get-clinic-schedule-by-id?clinicId=${clinicId}`
    );
    return res;
};

export {
    createClinicApi,
    getAllClinicApi,
    getClinicByIdApi,
    createClinicSpecialtyApi,
    createClinicDetailApi,
    updateClinicDetailApi,
    createClinicScheduleApi,
    getClinicScheduleApi,
    updateClinicScheduleByIdApi,
    getClinicScheduleByIdApi,
};
