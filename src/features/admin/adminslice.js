import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    allUser: [],
    gender: [],
    role: [],
    time: [],
    position: [],
    userById: {},
    doctorDetailInfo: {},
    doctorSchedule: {},
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
} = adminSlice.actions;

export default adminSlice.reducer;
