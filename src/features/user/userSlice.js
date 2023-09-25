import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: "en",
    verifyMessage: "",
    isLogin: false,
    currentUser: {},
    isLoading: false,
    allDoctor: [],
    doctorById: {},
    doctorScheduleById: [],
    hospitalScheduleById: [],
    selectedScheduleTime: {},
    selectedDate: {},
    dateDefault: {},
    allSpecialty: [],
    examination: {},
    clinicById: {},
    clinicScheduleById: {},
    errorCodeSuccessBooking: -1,
    allBookingAppointmentById: [],
    searchQueryResult: [],
    searchQuerySpecialtyResult: [],
    allExpert: [],
    examinationAppointmentDoctor: [],
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
            state.doctorScheduleById = [];
        },
        //
        setScheduleTime: (state, action) => {
            state.selectedScheduleTime = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setDateDefault: (state, action) => {
            state.dateDefault = action.payload;
        },
        setExamination: (state, action) => {
            state.examination = action.payload;
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
        //post VerifyBookAppointment
        postVerifyBookAppointmentStart: (state, action) => {
            state.isLoading = true;
            state.verifyMessage = "";
        },
        postVerifyBookAppointmentSuccess: (state, action) => {
            state.isLoading = false;
            state.verifyMessage = action.payload;
        },
        postVerifyBookAppointmentFailed: (state, action) => {
            state.isLoading = false;
            state.verifyMessage = action.payload;
        },
        //get hospital schedule
        getHospitalScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getHospitalScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.hospitalScheduleById = action.payload;
        },
        getHospitalScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
            state.hospitalScheduleById = [];
        },
        //get clinic by id
        getClinicByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getClinicByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.clinicById = action.payload;
        },
        getClinicByIdFailed: (state, action) => {
            state.isLoading = false;
            state.hospitalScheduleById = [];
        },
        //get clinic schedule by id
        getClinicScheduleByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getClinicScheduleByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.clinicScheduleById = action.payload;
        },
        getClinicScheduleByIdFailed: (state, action) => {
            state.isLoading = false;
            state.hospitalScheduleById = [];
        },
        //get clinic schedule by id
        postSuccessBookAppointmentStart: (state, action) => {
            state.isLoading = true;
        },
        postSuccessBookAppointmentSuccess: (state, action) => {
            state.isLoading = false;
            state.errorCodeSuccessBooking = action.payload;
        },
        postSuccessBookAppointmentFailed: (state, action) => {
            state.isLoading = false;
        },
        //get booking appointment by id
        getBookingAppointmentStart: (state, action) => {
            state.isLoading = true;
        },
        getBookingAppointmentSuccess: (state, action) => {
            state.isLoading = false;
            state.allBookingAppointmentById = action.payload;
        },
        getBookingAppointmentFailed: (state, action) => {
            state.isLoading = false;
        },
        //search
        postQuerySearchStart: (state, action) => {
            state.isLoading = true;
        },
        postQuerySearchSuccess: (state, action) => {
            state.isLoading = false;
            state.searchQueryResult = action.payload;
        },
        postQuerySearchFailed: (state, action) => {
            state.isLoading = false;
        },
        //search specialty
        postQuerySearchSpecialtyStart: (state, action) => {
            state.isLoading = true;
        },
        postQuerySearchSpecialtySuccess: (state, action) => {
            state.isLoading = false;
            state.searchQuerySpecialtyResult = action.payload;
        },
        postQuerySearchSpecialtyFailed: (state, action) => {
            state.isLoading = false;
        },
        //get all expert
        getAllExpertStart: (state, action) => {
            state.isLoading = true;
        },
        getAllExpertSuccess: (state, action) => {
            state.isLoading = false;
            state.allExpert = action.payload;
        },
        getAllExpertFailed: (state, action) => {
            state.isLoading = false;
        },
        //cancel appointment
        cancelAppointmentByIdStart: (state, action) => {
            state.isLoading = true;
        },
        cancelAppointmentByIdSuccess: (state, action) => {
            state.isLoading = false;
        },
        cancelAppointmentByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //get appointment doctor
        getAppointmentDoctorByIdStart: (state, action) => {
            state.isLoading = true;
        },
        getAppointmentDoctorByIdSuccess: (state, action) => {
            state.isLoading = false;
            state.examinationAppointmentDoctor = action.payload;
        },
        getAppointmentDoctorByIdFailed: (state, action) => {
            state.isLoading = false;
        },
        //compelete appointment doctor
        completeAppointmnetStart: (state, action) => {
            state.isLoading = true;
        },
        completeAppointmnetSuccess: (state, action) => {
            state.isLoading = false;
            state.examinationAppointmentDoctor = action.payload;
        },
        completeAppointmnetFailed: (state, action) => {
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
    setExamination,
    getAllSpecialtyStart,
    getAllSpecialtySuccess,
    getAllSpecialtyFailed,
    postPatientBookAppointmentStart,
    postPatientBookAppointmentSuccess,
    postPatientBookAppointmentFailed,
    postVerifyBookAppointmentStart,
    postVerifyBookAppointmentSuccess,
    postVerifyBookAppointmentFailed,
    getHospitalScheduleByIdStart,
    getHospitalScheduleByIdSuccess,
    getHospitalScheduleByIdFailed,
    getClinicByIdStart,
    getClinicByIdSuccess,
    getClinicByIdFailed,
    getClinicScheduleByIdStart,
    getClinicScheduleByIdSuccess,
    getClinicScheduleByIdFailed,
    postSuccessBookAppointmentStart,
    postSuccessBookAppointmentSuccess,
    postSuccessBookAppointmentFailed,
    getBookingAppointmentStart,
    getBookingAppointmentSuccess,
    getBookingAppointmentFailed,
    postQuerySearchStart,
    postQuerySearchSuccess,
    postQuerySearchFailed,
    postQuerySearchSpecialtyStart,
    postQuerySearchSpecialtySuccess,
    postQuerySearchSpecialtyFailed,
    getAllExpertStart,
    getAllExpertSuccess,
    getAllExpertFailed,
    cancelAppointmentByIdStart,
    cancelAppointmentByIdSuccess,
    cancelAppointmentByIdFailed,
    getAppointmentDoctorByIdStart,
    getAppointmentDoctorByIdSuccess,
    getAppointmentDoctorByIdFailed,
    completeAppointmnetStart,
    completeAppointmnetSuccess,
    completeAppointmnetFailed,
} = userSlice.actions;

export default userSlice.reducer;
