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

export const dataEntitySearch = [
    {
        title: "Tất cả",
        type: TYPE_SEARCH_PARAM.ALL,
    },
    {
        title: "Bác sĩ",
        type: TYPE_SEARCH_PARAM.DOCTOR,
    },
    {
        title: "Bệnh viện",
        type: TYPE_SEARCH_PARAM.HOSPITAL,
    },
    {
        title: "Phòng khám",
        type: TYPE_SEARCH_PARAM.CLINIC,
    },
];

export const dataStepScheduleHcp = [
    {
        title: "Quản lý lịch khám",
        image: images.scheduleManage,
        description:
            "Lịch khám bệnh nhân được thống kê ngay trên ứng dụng. Bác sĩ dễ dàng kiểm tra bất cứ lúc nào.",
    },
    {
        title: "Quản lý hồ sơ",
        image: images.profileManage,
        description:
            "Hồ sơ bệnh nhân được lưu trữ tự động ngay trên ứng dụng. Bác sĩ dễ dàng theo dõi và tìm lại.",
    },
    {
        title: "Tư vấn trực tuyến",
        image: images.adviseStep2,
        description:
            "Tính năng tư vấn trực tuyến cho phép Bác sĩ tư vấn và thăm khám sức khỏe người bệnh từ xa.",
    },
    {
        title: "Đặt khám miễn phí",
        image: images.bookingStepSchedule,
        description:
            "Bệnh nhân đặt khám miễn phí trên ứng dụng YouMed. Trả kết quả, đơn thuốc và nhắc tái khám.",
    },
];

export const dataServiceHcp = [
    {
        title: "Phần mềm Quản lý phòng khám",
        image: images.hcpSetting,
        description: "Quản lý khám bệnh, lưu trữ,...",
        redirect: "#schedule-manage",
    },
    {
        title: "Ứng dụng Quản lý lịch khám",
        image: images.hcpCalendar,
        description: "Quản lý lịch khám, hồ sơ,...",
        redirect: "#clinic-manage",
    },
    {
        title: "Nền tảng Tư vấn trực tuyến",
        image: images.hcpPhone,
        description: "Chủ động thời gian, khám nhanh, kịp thời,...",
        redirect: "#advise-online",
    },
];

export const dataAdviseStepImage = [
    {
        title: "Bước 1: Chọn bác sĩ chuyên khoa",
        image: images.adviseStep1,
    },
    {
        title: "Bước 2: Gọi ngay hoặc Đặt lịch tư vấn",
        image: images.adviseStep2,
    },
    {
        title: "Bước 3: Tư vấn với bác sĩ qua video/ audio",
        image: images.adviseStep2,
    },
    {
        title: "Bước 4: Nhận kết quả tư vấn",
        image: images.adviseStep3,
    },
];

export const dataAdviseHeath = [
    {
        title: "Kết nối với bác sĩ chuyên khoa 24/7",
        description:
            "Gọi ngay hoặc chủ động Đặt lịch tư vấn với các bác sĩ đầu ngành của YouMed.",
        image: images.heath1,
    },
    {
        title: "Bảo mật thông tin",
        description:
            "Tuân theo đạo luật HIPAA và ứng dụng công nghệ cao, YouMed cam kết bảo mật toàn bộ thông tin cuộc tư vấn của bạn với bác sĩ.",
        image: images.heath2,
    },
    {
        title: "Tiện lợi và Tiết kiệm",
        description:
            "Không tốn công di chuyển, không cần chờ khám. Kết nối với các bác sĩ đầu ngành chỉ với chiếc điện thoại của bạn.",
        image: images.heath3,
    },
];
