import { path } from "../../utils/contants";

export const menuAppointment = [
    {
        title: "Đặt lịch khám Bác sĩ",
        text: "Đặt lịch khám không chờ đợi",
        to: path.DOCTOR_APPOINTMENT,
    },
    {
        title: "Đặt lịch Bệnh viện",
        text: "Đặt khám, thanh toán, nhận kết quả",
        to: path.HOSPITAL_APPOINTMENT,
    },
    {
        title: "Đặt khám Phòng khám",
        text: "Đa dạng chuyên khoa và dịch vụ",
        to: path.CLINIC_APPOINTMENT,
    },
    {
        title: "Đặt lịch xét nghiệm",
        text: "Lấy mẫu xét nghiệm tại nhà",
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
        title: "Lịch Khám",
        to: path.SCHEDULE,
    },
    {
        title: "Lịch sử thanh toán",
        to: path.PAYMENT_HISTORY,
    },
    {
        title: "Hồ sơ",
        to: path.PROFILE,
    },
    {
        title: "Đăng nhập vào hệ thống",
        to: path.SYSTEM,
    },
    {
        title: "Thoát",
        key: "logout",
        to: path.HOME,
    },
];
