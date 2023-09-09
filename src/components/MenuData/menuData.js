import { Translation } from "react-i18next";

import { path, language } from "../../utils/constant";
import images from "../../assets/image";

export const menuAppointment = [
    {
        title: <Translation>{(t) => t("home.appointment_doctor")}</Translation>,
        text: (
            <Translation>
                {(t) => t("home.appointment_no_waitting")}
            </Translation>
        ),
        to: path.DOCTOR_APPOINTMENT,
    },
    {
        title: <Translation>{(t) => t("home.hospital")}</Translation>,
        text: <Translation>{(t) => t("home.pay_result")}</Translation>,
        to: path.HOSPITAL_APPOINTMENT,
    },
    {
        title: <Translation>{(t) => t("home.appointmnet_clinic")}</Translation>,
        text: <Translation>{(t) => t("home.diverse_specialties")}</Translation>,
        to: path.CLINIC_APPOINTMENT,
    },
];

export const menuMedicalStaff = [
    {
        title: "YouMed HCP",
        to: path.HCP,
    },
    {
        title: "YouMed Clinic",
        to: path.CLINIC,
    },
    {
        title: "Y360",
        href: "https://y360.vn/",
    },
];

export const menuUserInfo = [
    {
        title: <Translation>{(t) => t("home.schedule")}</Translation>,
        to: path.SCHEDULE,
    },
    {
        title: <Translation>{(t) => t("home.language")}</Translation>,
        menuSub: {
            title: <Translation>{(t) => t("home.language")}</Translation>,
            data: [
                {
                    title: "English",
                    code: language.EN,
                },
                {
                    title: "Vietnamese",
                    code: language.VN,
                },
            ],
        },
    },
    {
        title: <Translation>{(t) => t("home.profile")}</Translation>,
        to: path.PROFILE_USER,
    },
    {
        title: <Translation>{(t) => t("home.login_system")}</Translation>,
        to: path.SYSTEM,
    },
    {
        title: <Translation>{(t) => t("home.log_out")}</Translation>,
        to: path.LOGOUT,
    },
];

export const menuBar = [
    {
        title: <Translation>{(t) => t("home.schedule")}</Translation>,
        to: path.SCHEDULE,
    },
    {
        title: <Translation>{(t) => t("home.profile")}</Translation>,
        to: path.PROFILE_USER,
    },
    {
        title: <Translation>{(t) => t("home.log_out")}</Translation>,
        to: path.LOGOUT,
    },
];

export const menuSystemAdmin = [
    [
        {
            titleTop: (
                <Translation>{(t) => t("system.user_title")}</Translation>
            ),
            title: (
                <Translation>
                    {(t) => t("system.user_manage_title")}
                </Translation>
            ),
            to: path.USER_MANAGE,
        },
        {
            title: (
                <Translation>{(t) => t("system.doctor_manage")}</Translation>
            ),
            menuSub: {
                data: [
                    {
                        title: (
                            <Translation>{(t) => t("system.info")}</Translation>
                        ),
                        to: path.DOCTOR_MANAGE,
                    },
                    {
                        title: (
                            <Translation>
                                {(t) => t("system.schedule")}
                            </Translation>
                        ),
                        to: path.DOCTOR_SCHEDULE,
                    },
                ],
            },
        },
    ],
    [
        {
            titleTop: (
                <Translation>{(t) => t("system.specialty_title")}</Translation>
            ),
            title: (
                <Translation>{(t) => t("system.specialty_manage")}</Translation>
            ),
            to: path.SPECIALTY_MANAGE,
        },
    ],
    [
        {
            titleTop: (
                <Translation>{(t) => t("system.hospital_title")}</Translation>
            ),
            title: (
                <Translation>{(t) => t("system.hospital_manage")}</Translation>
            ),
            to: path.HOSPITAL_MANAGE,
        },
        {
            title: (
                <Translation>
                    {(t) => t("system.hospital_manage_detail")}
                </Translation>
            ),
            to: path.HOSPITAL_MANAGE_DETAIL,
        },
        {
            title: (
                <Translation>
                    {(t) => t("system.hospital_schedule")}
                </Translation>
            ),
            to: path.HOSPITAL_SCHEDULE,
        },
    ],
    [
        {
            titleTop: (
                <Translation>{(t) => t("system.clinic_title")}</Translation>
            ),
            title: (
                <Translation>{(t) => t("system.clinic_manage")}</Translation>
            ),
            to: path.CLINIC_MANAGE,
        },
        {
            title: (
                <Translation>
                    {(t) => t("system.clinic_manage_detail")}
                </Translation>
            ),
            to: path.CLINIC_MANAGE_DETAIL,
        },
        {
            title: (
                <Translation>{(t) => t("system.clinic_schedule")}</Translation>
            ),
            to: path.CLINIC_SCHEDULE,
        },
    ],
];

export const navBooking = [
    {
        title: "Đặt khám Bác sĩ",
        icon: images.iconDoctorBooking,
        to: path.DOCTOR_APPOINTMENT,
    },
    {
        title: "Đặt khám Bệnh viện",
        icon: images.iconHospitalBooking,
        to: path.HOSPITAL_APPOINTMENT,
    },
    {
        title: "Đặt khám Phòng khám",
        icon: images.iconClinicBooking,
        to: path.CLINIC_APPOINTMENT,
    },
];
