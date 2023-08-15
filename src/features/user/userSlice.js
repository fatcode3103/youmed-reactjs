import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: "en",
    isLogin: false,
    currentUser: {},
    isLoading: false,
    allDoctor: [],
    doctorById: {},
    doctorScheduleById: [],
    selectedScheduleTime: {},
    selectedDate: {},
    dateDefault: {},
    allSpecialty: [],
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
        //get doctor schedule
        getDoctorScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getDoctorScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.doctorScheduleById = action.payload;
        },
        getDoctorScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
            state.doctorScheduleById = {};
        },
        setScheduleTime: (state, action) => {
            state.selectedScheduleTime = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setDateDefault: (state, action) => {
            state.dateDefault = action.payload;
        },
        //get all specialty
        getAllSpecialtyStart: (state, action) => {
            state.isLoading = true;
        },
        getAllSpecialtySuccess: (state, action) => {
            state.isLoading = false;
            state.allSpecialty = action.payload;
        },
        getAllSpecialtyFailed: (state, action) => {
            state.isLoading = false;
        },
        //post PatientBookAppointment
        postPatientBookAppointmentStart: (state, action) => {
            state.isLoading = true;
        },
        postPatientBookAppointmentSuccess: (state, action) => {
            state.isLoading = false;
        },
        postPatientBookAppointmentFailed: (state, action) => {
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
    getDoctorScheduleByIdStart,
    getDoctorScheduleByIdSuccess,
    getDoctorScheduleByIdFailed,
    setScheduleTime,
    setSelectedDate,
    setDateDefault,
    getAllSpecialtyStart,
    getAllSpecialtySuccess,
    getAllSpecialtyFailed,
    postPatientBookAppointmentStart,
    postPatientBookAppointmentSuccess,
    postPatientBookAppointmentFailed,
} = userSlice.actions;

export default userSlice.reducer;
