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

const getAllDoctorApi = async (limit) => {
    let res = await httpRequest.get(`get-all-doctor?limit=${limit}`);
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

const postPatientBookAppointmentApi = async (data) => {
    let res = await httpRequest.post(`post-patient-book-appointment`, data);
    return res;
};

const postVerifyBookAppointmentApi = async ({
    validEntity,
    patientId,
    token,
}) => {
    let res = await httpRequest.post(
        `post-verify-book-appointment?${validEntity.key}=${validEntity.value}&patientId=${patientId}&token=${token}`
    );
    return res;
};

const postSuccessBookAppointmentApi = async ({ patientId, token }) => {
    let res = await httpRequest.post(
        `post-success-appointment?patientId=${patientId}&token=${token}`
    );
    return res;
};

const getBookingAppointmentApi = async (patientId) => {
    let res = await httpRequest.get(
        `get-booking-appointment?patientId=${patientId}`
    );
    return res;
};

const getAllExpertApi = async () => {
    let res = await httpRequest.get(`get-all-expert`);
    return res;
};

const cancelAppointmentByIdApi = async (appointmentId) => {
    let res = await httpRequest.put(
        `cancel-appointment-by-id?appointmentId=${appointmentId}`
    );
    return res;
};

const getAppointmentDoctorByIdApi = async (doctorId) => {
    let res = await httpRequest.get(
        `get-appointment-doctor-by-id?doctorId=${doctorId}`
    );
    return res;
};

const completeAppointmetApi = async (token) => {
    let res = await httpRequest.put(`complete-appointment?token=${token}`);
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
    postPatientBookAppointmentApi,
    postVerifyBookAppointmentApi,
    postSuccessBookAppointmentApi,
    getBookingAppointmentApi,
    getAllExpertApi,
    cancelAppointmentByIdApi,
    getAppointmentDoctorByIdApi,
    completeAppointmetApi,
};
