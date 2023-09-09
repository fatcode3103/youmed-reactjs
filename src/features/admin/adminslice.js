import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    allUser: [],
    gender: [],
    role: [],
    time: [],
    position: [],
    examination: [],
    userById: {},
    doctorDetailInfo: {},
    doctorSchedule: {},
    allHospital: [],
    hospitalById: {},
    hospitalSpecialtyById: [],
    hospitalSchedule: {},
    allClinic: [],
    clinicSchedule: {},
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        //al user
        getAllUserStart: (state, action) => {
            state.isLoading = true;
        },
        getAllUserSuccess: (state, action) => {
            state.isLoading = false;
            state.allUser = action.payload;
        },
        getAllUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //get allcode
        getAllCodeStart: (state, action) => {
            state.isLoading = true;
        },
        getAllCodeSuccess: (state, action) => {
            const type = action.payload.type.toLowerCase();
            state.isLoading = false;
            state[type] = action.payload.data;
        },
        getAllCodeFailed: (state, action) => {
            state.isLoading = false;
        },
        //create user
        postUserStart: (state, action) => {
            state.isLoading = true;
        },
        postUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        postUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //delete user
        deleteUserStart: (state, action) => {
            state.isLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        deleteUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //get user by id
        getUserByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getUserByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.userById = action.payload;
        },
        getUserByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //edit user
        editUserStart: (state, action) => {
            state.isLoading = true;
        },
        editUserSuccess: (state, action) => {
            state.isLoading = false;
        },
        editUserFailed: (state, action) => {
            state.isLoading = false;
        },
        //post doctor info
        postDoctorInfoByIdStart: (state, action) => {
            state.isLoading = true;
        },
        postDoctorInfoByIdSuccess: (state, action) => {
            state.isLoading = false;
        },
        postDoctorInfoByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //get doctor detail info
        getDoctorDetailInfoStart: (state, action) => {
            state.isLoading = false;
        },
        getDoctorDetailInfoSuccess: (state, action) => {
            state.isLoading = false;
            state.doctorDetailInfo = action.payload;
        },
        getDoctorDetailInfoFailed: (state, action) => {
            state.isLoading = false;
            state.doctorDetailInfo = {};
        },
        //update doctor detail info
        putDoctorDetailInfoStart: (state, action) => {
            state.isLoading = true;
        },
        putDoctorDetailInfoSuccess: (state, action) => {
            state.isLoading = false;
        },
        putDoctorDetailInfoFailed: (state, action) => {
            state.isLoading = false;
        },
        //create doctor schedule
        postDoctorScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        postDoctorScheduleSuccess: (state, action) => {
            state.isLoading = false;
        },
        postDoctorScheduleFailed: (state, action) => {
            state.isLoading = false;
        },
        //get doctor schedule
        getDoctorScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        getDoctorScheduleSuccess: (state, action) => {
            state.isLoading = false;
            state.doctorSchedule = action.payload;
        },
        getDoctorScheduleFailed: (state, action) => {
            state.isLoading = false;
            state.doctorSchedule = {};
        },
        //update doctor schedule
        updateDoctorScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        updateDoctorScheduleSuccess: (state, action) => {
            state.isLoading = false;
        },
        updateDoctorScheduleFailed: (state, action) => {
            state.isLoading = false;
        },
        //create specialty
        createSpecialtyStart: (state, action) => {
            state.isLoading = true;
        },
        createSpecialtySuccess: (state, action) => {
            state.isLoading = false;
        },
        createSpecialtyFailed: (state, action) => {
            state.isLoading = false;
        },
        //create hospital
        createHospitalStart: (state, action) => {
            state.isLoading = true;
        },
        createHospitalSuccess: (state, action) => {
            state.isLoading = false;
        },
        createHospitalFailed: (state, action) => {
            state.isLoading = false;
        },
        //get all hospital
        getAllHospitalStart: (state, action) => {
            state.isLoading = true;
        },
        getAllHospitalSuccess: (state, action) => {
            state.isLoading = false;
            state.allHospital = action.payload;
        },
        getAllHospitalFailed: (state, action) => {
            state.isLoading = false;
        },
        //create detail hospital
        createHospitalDetailStart: (state, action) => {
            state.isLoading = true;
        },
        createHospitalDetailSuccess: (state, action) => {
            state.isLoading = false;
        },
        createHospitalDetailFailed: (state, action) => {
            state.isLoading = false;
        },
        //get hospital by id
        getHospitalByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getHospitalByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.hospitalById = action.payload;
        },
        getHospitalByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //get specialty hospital
        getHospitalSpecialtyByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getHospitalSpecialtyByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.hospitalSpecialtyById = action.payload;
        },
        getHospitalSpecialtyByIdlFailed: (state, action) => {
            state.isLoading = false;
        },
        //update detail hospital
        updateHospitalDetailStart: (state, action) => {
            state.isLoading = true;
        },
        updateHospitalDetailSuccess: (state, action) => {
            state.isLoading = false;
        },
        updateHospitalDetailFailed: (state, action) => {
            state.isLoading = false;
        },
        //create hospital schedule
        createHospitalScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        createHospitalScheduleSuccess: (state, action) => {
            state.isLoading = false;
        },
        createHospitalScheduleFailed: (state, action) => {
            state.isLoading = false;
        },
        //get hospital schedule by id
        getHospitalScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getHospitalScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.hospitalSchedule = action.payload;
        },
        getHospitalScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
            state.hospitalSchedule = {};
        },
        //update hospital schedule by id
        updateHospitalScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        updateHospitalScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
        },
        updateHospitalScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //creat clinic
        createClinicStart: (state, action) => {
            state.isLoading = true;
        },
        createClinicSuccess: (state, action) => {
            state.isLoading = false;
        },
        createClinicFailed: (state, action) => {
            state.isLoading = false;
        },
        //get all clinic
        getAllClinicStart: (state, action) => {
            state.isLoading = true;
        },
        getAllClinicSuccess: (state, action) => {
            state.isLoading = false;
            state.allClinic = action.payload;
        },
        getAllClinicFailed: (state, action) => {
            state.isLoading = false;
        },
        //create detail clinic
        createClinicDetailStart: (state, action) => {
            state.isLoading = true;
        },
        createClinicDetailSuccess: (state, action) => {
            state.isLoading = false;
        },
        createClinicDetailFailed: (state, action) => {
            state.isLoading = false;
        },
        //update detail clinic
        updateClinicDetailStart: (state, action) => {
            state.isLoading = true;
        },
        updateClinicDetailSuccess: (state, action) => {
            state.isLoading = false;
        },
        updateClinicDetailFailed: (state, action) => {
            state.isLoading = false;
        },
        //create clinic schedule
        createClinicScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        createClinicScheduleSuccess: (state, action) => {
            state.isLoading = false;
        },
        createClinicScheduleFailed: (state, action) => {
            state.isLoading = false;
        },
        //get clinic schedule id & date
        getClinicScheduleStart: (state, action) => {
            state.isLoading = true;
        },
        getClinicScheduleSuccess: (state, action) => {
            state.isLoading = false;
            state.clinicSchedule = action.payload;
        },
        getClinicScheduleFailed: (state, action) => {
            state.isLoading = false;
            state.clinicSchedule = {};
        },
        //update clinic schedule id
        updateClinicScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        updateClinicScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
        },
        updateClinicScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const {
    getAllUserStart,
    getAllUserSuccess,
    getAllUserFailed,
    getAllCodeStart,
    getAllCodeSuccess,
    getAllCodeFailed,
    postUserStart,
    postUserSuccess,
    postUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    getUserByIdStart,
    getUserByIdSuccess,
    getUserByIdFailed,
    editUserStart,
    editUserSuccess,
    editUserFailed,
    postDoctorInfoByIdStart,
    postDoctorInfoByIdSuccess,
    postDoctorInfoByIdFailed,
    getDoctorDetailInfoStart,
    getDoctorDetailInfoSuccess,
    getDoctorDetailInfoFailed,
    putDoctorDetailInfoStart,
    putDoctorDetailInfoSuccess,
    putDoctorDetailInfoFailed,
    postDoctorScheduleStart,
    postDoctorScheduleSuccess,
    postDoctorScheduleFailed,
    getDoctorScheduleStart,
    getDoctorScheduleSuccess,
    getDoctorScheduleFailed,
    updateDoctorScheduleStart,
    updateDoctorScheduleSuccess,
    updateDoctorScheduleFailed,
    createSpecialtyStart,
    createSpecialtySuccess,
    createSpecialtyFailed,
    createHospitalStart,
    createHospitalSuccess,
    createHospitalFailed,
    getAllHospitalStart,
    getAllHospitalSuccess,
    getAllHospitalFailed,
    createHospitalDetailStart,
    createHospitalDetailSuccess,
    createHospitalDetailFailed,
    getHospitalByIdStart,
    getHospitalByIdSuccess,
    getHospitalByIdFailed,
    updateHospitalDetailStart,
    updateHospitalDetailSuccess,
    updateHospitalDetailFailed,
    createHospitalScheduleStart,
    createHospitalScheduleSuccess,
    createHospitalScheduleFailed,
    getHospitalScheduleByIdStart,
    getHospitalScheduleByIdSuccess,
    getHospitalScheduleByIdFailed,
    updateHospitalScheduleByIdStart,
    updateHospitalScheduleByIdSuccess,
    updateHospitalScheduleByIdFailed,
    createClinicStart,
    createClinicSuccess,
    createClinicFailed,
    getAllClinicStart,
    getAllClinicSuccess,
    getAllClinicFailed,
    createClinicDetailStart,
    createClinicDetailSuccess,
    createClinicDetailFailed,
    updateClinicDetailStart,
    updateClinicDetailSuccess,
    updateClinicDetailFailed,
    createClinicScheduleStart,
    createClinicScheduleSuccess,
    createClinicScheduleFailed,
    getClinicScheduleStart,
    getClinicScheduleSuccess,
    getClinicScheduleFailed,
    updateClinicScheduleByIdStart,
    updateClinicScheduleByIdSuccess,
    updateClinicScheduleByIdFailed,
} = adminSlice.actions;

export default adminSlice.reducer;
