import { Translation } from "react-i18next";

import { path, language } from "../../utils/constant";

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
    {
        title: <Translation>{(t) => t("home.appointment_test")}</Translation>,
        text: <Translation>{(t) => t("home.take_samples")}</Translation>,
        to: path.TEST_APPOINTMENT,
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
        key: "none",
        menuSub: {
            title: <Translation>{(t) => t("home.language")}</Translation>,
            data: [
                {
                    title: "English",
                    code: language.EN,
                    key: "none",
                },
                {
                    title: "Vietnamese",
                    code: language.VN,
                    key: "none",
                },
            ],
        },
    },
    {
        title: <Translation>{(t) => t("home.payment_history")}</Translation>,
        to: path.PAYMENT_HISTORY,
    },
    {
        title: <Translation>{(t) => t("home.profile")}</Translation>,
        to: path.PROFILE,
    },
    {
        title: <Translation>{(t) => t("home.login_system")}</Translation>,
        to: path.SYSTEM,
    },
    {
        title: <Translation>{(t) => t("home.log_out")}</Translation>,
        key: "logout",
        to: path.HOME,
    },
];
