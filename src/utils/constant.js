export const path = {
    //home
    HOME: "/",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    SYSTEM: "/system",

    PROFILE_USER: "/profile",
    HCP: "/hcp",
    CLINIC: "/clinic",
    SCHEDULE: "/schedule",
    PAYMENT_HISTORY: "/payment-history",
    //system
    USER_MANAGE: "/system/user-manage",
    SPECIALTY_MANAGE: "/system/specialty-manage",
    HOSPITAL_MANAGE: "/system/hospital-manage",
    HOSPITAL_MANAGE_DETAIL: "/system/hospital-manage-detail",
    HOSPITAL_SCHEDULE: "/system/hospital-schedule",
    CLINIC_MANAGE: "/system/clinic-manage",
    CLINIC_MANAGE_DETAIL: "/system/clinic-manage-detail",
    CLINIC_SCHEDULE: "/system/clinic-schedule",
    DOCTOR_MANAGE: "/system/doctor-manage",
    DOCTOR_SCHEDULE: "/system/doctor-schedule",
    //booking
    BOOKING: "/booking",
    DOCTOR_APPOINTMENT: "/booking/doctor",
    HOSPITAL_APPOINTMENT: "/booking/hospital",
    CLINIC_APPOINTMENT: "/booking/clinic",
    // TEST_APPOINTMENT: "/booking/test",
    DOCTOR_DETAIL: "/booking/doctor-detail/:id",
    BOOKING_BY_DOCTOR: "/booking/doctor/:name/:id/booking",
    //hospital
    HOSPITAL_DETAIL: "/booking/hospital-detail/:id",
    BOOKING_BY_HOSPITAL: "/booking/hospital/:name/:id/booking", /// booking hospital
    VERIFY_BOOK_APPOINTMENT: "/verify-booking",
    //clinic
    CLINIC_DETAIL: "/booking/clinic-detail/:id",
    BOOKING_BY_CLINIC: "/booking/clinic/:name/:id/booking",
    //booking success
    BOOKING_SUCCESS: "/success-booking/errorCode=0",
};

export const language = {
    EN: "en",
    VN: "vi",
};

export const role = {
    ADMIN: "R1",
    DOCTOR: "R2",
    PATIENT: "R3",
};

export const distinguishSubjectExamination = {
    DOCTOR: "DOCTOR",
    HOSPITAL: "HOSPITAL",
    CLINIC: "CLINIC",
};

export const date = {
    DATE_UP_SERVER: "MM/DD/YYYY",
    DATE_CLIENT_VI: "dddd - DD/MM",
    DATE_CLIENT_EN: "dddd - MM/DD",
    DATE_BIRTH_PICKER_CLIENT_VI: "dd/MM/yyyy",
    DATE_BIRTH_PICKER_CLIENT_EN: "MM/dd/yyyy",
    DATE_BIRTH_CLIENT_VI: "DD/MM/YYYY",
    DATE_BIRTH_CLIENT_EN: "MM/DD/YYYY",
};
