export const path = {
    //home
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    SYSTEM: "/system",

    HCP: "/hcp",
    CLINIC: "/clinic",
    SCHEDULE: "/schdule",
    PAYMENT_HISTORY: "/payment-history",
    PROFILE: "/profile",
    //system
    USER_MANAGE: "/system/user-manage",
    SPECIALTY_MANAGE: "/system/specialty-manage",
    DOCTOR_MANAGE: "/system/doctor-manage",
    DOCTOR_SCHEDULE: "/system/doctor-schedule",
    //booking
    BOOKING: "/booking",
    DOCTOR_APPOINTMENT: "/booking/doctor",
    HOSPITAL_APPOINTMENT: "/booking/hospital",
    CLINIC_APPOINTMENT: "/booking/clinic",
    TEST_APPOINTMENT: "/booking/test",
    DOCTOR_DETAIL: "/booking/doctor-detail/id=/:id",
    BOOKING_BY_DOCTOR: "/booking/:name/id=/:id/booking",
    // BOOKING_BY_DOCTOR_2: "/booking/:name/id=/:id/booking",
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

export const date = {
    DATE_UP_SERVER: "MM/DD/YYYY",
    DATE_CLIENT_VI: "dddd - DD/MM",
    DATE_CLIENT_EN: "dddd - MM/DD",
    DATE_BIRTH_PICKER_CLIENT_VI: "dd/MM/yyyy",
    DATE_BIRTH_PICKER_CLIENT_EN: "MM/dd/yyyy",
    DATE_BIRTH_CLIENT_VI: "DD/MM/YYYY",
    DATE_BIRTH_CLIENT_EN: "MM/DD/YYYY",
};
