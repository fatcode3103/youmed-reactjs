import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: "en",
    isLogin: false,
    currentUser: {},
    isLoading: false,
    allDoctor: [],
    doctorById: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //login
        loginStart: (state, action) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLogin = true;
            state.isLoading = false;
            state.currentUser = action.payload.data;
        },
        loginFailed: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
        },
        //logout
        logoutStart: (state, action) => {
            state.isLoading = true;
        },
        logoutSuccess: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
            state.currentUser = [];
        },
        logoutFailed: (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
        },
        //language
        changeLanguageStart: (state, action) => {
            state.isLoading = true;
        },
        changeLanguageSuccess: (state, action) => {
            state.isLoading = false;
            state.language = action.payload;
        },
        changeLanguageFailed: (state, action) => {
            state.isLoading = false;
        },
        //all doctor
        getAllDoctorStart: (state, action) => {
            state.isLoading = true;
        },
        getAllDoctorSuccess: (state, action) => {
            state.isLoading = false;
            state.allDoctor = action.payload;
        },
        getAllDoctorFailed: (state, action) => {
            state.isLoading = false;
        },
        //doctor by id
        getDoctorByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getDoctorByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.doctorById = action.payload;
        },
        getDoctorByIdFailed: (state, action) => {
            state.isLoading = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    changeLanguageStart,
    changeLanguageSuccess,
    changeLanguageFailed,
    getAllDoctorStart,
    getAllDoctorSuccess,
    getAllDoctorFailed,
    getDoctorByIdStart,
    getDoctorByIdSuccess,
    getDoctorByIdFailed,
} = userSlice.actions;

export default userSlice.reducer;
