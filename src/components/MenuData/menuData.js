import { Translation } from "react-i18next";

import { path, language, TYPE_SEARCH_PARAM } from "../../utils/constant";
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

export const menuAdminInfo = [
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

export const menuDoctorInfo = [
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
        to: path.SYSTEM_DOCTOR,
    },
    {
        title: <Translation>{(t) => t("home.log_out")}</Translation>,
        to: path.LOGOUT,
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

export const menuHeader = [
    [
        {
            titleTop: <Translation>{(t) => t("home.appointment")}</Translation>,
            isMenu: true,
            title: (
                <Translation>{(t) => t("home.appointment_doctor")}</Translation>
            ),
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
            title: (
                <Translation>{(t) => t("home.appointmnet_clinic")}</Translation>
            ),
            text: (
                <Translation>
                    {(t) => t("home.diverse_specialties")}
                </Translation>
            ),
            to: path.CLINIC_APPOINTMENT,
        },
    ],
    [
        {
            title: <Translation>{(t) => t("home.counseling")}</Translation>,
            isMenu: false,
            to: path.ADVISE_ONLINE,
        },
    ],
    [
        {
            title: <Translation>{(t) => t("home.store")}</Translation>,
            isMenu: false,
            to: "https://youmedstore.vn/",
        },
    ],
    [
        {
            title: <Translation>{(t) => t("home.medical_news")}</Translation>,
            isMenu: false,
            to: path.MEDICAL_NEWS,
        },
    ],
    [
        {
            titleTop: (
                <Translation>{(t) => t("home.medical_staff")}</Translation>
            ),
            isMenu: true,
            title: "YouMed HCP",
            to: path.HCP,
        },
        {
            title: "Y360",
            href: "https://y360.vn/",
        },
    ],
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

export const menuSystemDoctor = [
    [
        {
            titleTop: "Quản lý",
            title: "Quản lý lịch đặt khám",
            to: path.MANAGE_APPOINTMNET,
        },
    ],
];

export const navBooking = [
    {
        title: <Translation>{(t) => t("booking.title_doctor")}</Translation>,
        icon: images.iconDoctorBooking,
        to: path.DOCTOR_APPOINTMENT,
    },
    {
        title: <Translation>{(t) => t("booking.title_hospital")}</Translation>,
        icon: images.iconHospitalBooking,
        to: path.HOSPITAL_APPOINTMENT,
    },
    {
        title: <Translation>{(t) => t("booking.title_clinic")}</Translation>,
        icon: images.iconClinicBooking,
        to: path.CLINIC_APPOINTMENT,
    },
];

export const dataEntitySearch = [
    {
        title: <Translation>{(t) => t("search.all")}</Translation>,
        type: TYPE_SEARCH_PARAM.ALL,
    },
    {
        title: <Translation>{(t) => t("search.doctor")}</Translation>,
        type: TYPE_SEARCH_PARAM.DOCTOR,
    },
    {
        title: <Translation>{(t) => t("search.hospital")}</Translation>,
        type: TYPE_SEARCH_PARAM.HOSPITAL,
    },
    {
        title: <Translation>{(t) => t("search.clinic")}</Translation>,
        type: TYPE_SEARCH_PARAM.CLINIC,
    },
];

export const dataStepScheduleHcp = [
    {
        title: (
            <Translation>
                {(t) => t("hcp.menu_data.schedule_manage")}
            </Translation>
        ),
        image: images.scheduleManage,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.schedule_manage_des")}
            </Translation>
        ),
    },
    {
        title: (
            <Translation>
                {(t) => t("hcp.menu_data.profile_manage")}
            </Translation>
        ),
        image: images.profileManage,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.profile_manage_des")}
            </Translation>
        ),
    },
    {
        title: (
            <Translation>{(t) => t("hcp.menu_data.advise_online")}</Translation>
        ),
        image: images.adviseStep2,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.advise_online_des")}
            </Translation>
        ),
    },
    {
        title: (
            <Translation>
                {(t) => t("hcp.menu_data.free_examination")}
            </Translation>
        ),
        image: images.bookingStepSchedule,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.free_examination_des")}
            </Translation>
        ),
    },
];

export const dataServiceHcp = [
    {
        title: (
            <Translation>{(t) => t("hcp.menu_data.clinic_manage")}</Translation>
        ),
        image: images.hcpSetting,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.clinic_manage_des")}
            </Translation>
        ),
        redirect: "#schedule-manage",
    },
    {
        title: (
            <Translation>
                {(t) => t("hcp.menu_data.app_schedule_manage")}
            </Translation>
        ),
        image: images.hcpCalendar,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.app_schedule_manage_des")}
            </Translation>
        ),
        redirect: "#clinic-manage",
    },
    {
        title: (
            <Translation>
                {(t) => t("hcp.menu_data.consulting_platform")}
            </Translation>
        ),
        image: images.hcpPhone,
        description: (
            <Translation>
                {(t) => t("hcp.menu_data.consulting_platform_des")}
            </Translation>
        ),
        redirect: "#advise-online",
    },
];

export const dataAdviseStepImage = [
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.step_1")}
            </Translation>
        ),
        image: images.adviseStep1,
    },
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.step_2")}
            </Translation>
        ),
        image: images.adviseStep2,
    },
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.step_3")}
            </Translation>
        ),
        image: images.adviseStep2,
    },
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.step_4")}
            </Translation>
        ),
        image: images.adviseStep3,
    },
];

export const dataAdviseHeath = [
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_1")}
            </Translation>
        ),
        description: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_1_des")}
            </Translation>
        ),
        image: images.heath1,
    },
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_2")}
            </Translation>
        ),
        description: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_2_des")}
            </Translation>
        ),
        image: images.heath2,
    },
    {
        title: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_3")}
            </Translation>
        ),
        description: (
            <Translation>
                {(t) => t("advise_online.menu_data.health_3_des")}
            </Translation>
        ),
        image: images.heath3,
    },
];
