import { path } from "../utils/constant.js";
import Home from "../containers/Home";
import LoginPage from "../components/Auth/LoginPage";
import Register from "../components/Auth/Register";
import System from "../containers/System/System";
import PageNotFound from "../components/PageNotFound";
import DoctorDetail from "../containers/Booking/DoctorDetail/DoctorDetail";
import { UserManage, SpecialtyManage } from "../containers/System/Admin";
import Booking from "../containers/Booking";
import {
    DoctorInfoManage,
    DoctorSchedule,
} from "../containers/System/Admin/DoctorManage";
import BookingAppointment from "../containers/Booking/BookingAppointmentDoctor";
import VerifyBookAppointment from "../components/VerifyBookAppointment/index.js";
import {
    HospitalManage,
    HospitalManageDetail,
} from "../containers/System/Admin/HospitalManage";
import HospitalDetail from "../containers/Booking/HospitalDetail";
import BookingAppointmentHospital from "../containers/Booking/BookingAppointmentHospital/index.js";

export const routerPublic = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: LoginPage },
    { path: path.REGISTER, component: Register },
    { path: path.DOCTOR_DETAIL, component: DoctorDetail },
    { path: path.BOOKING, component: Booking },
    { path: path.VERIFY_BOOK_APPOINTMENT, component: VerifyBookAppointment },
    { path: path.HOSPITAL_DETAIL, component: HospitalDetail },
    { path: "*", component: PageNotFound },
];

export const routerPrivate = [
    { path: path.SYSTEM, component: System },
    { path: path.USER_MANAGE, component: UserManage },
    { path: path.DOCTOR_MANAGE, component: DoctorInfoManage },
    { path: path.DOCTOR_SCHEDULE, component: DoctorSchedule },
    { path: path.SPECIALTY_MANAGE, component: SpecialtyManage },
    { path: path.HOSPITAL_MANAGE, component: HospitalManage },
    { path: path.HOSPITAL_MANAGE_DETAIL, component: HospitalManageDetail },
];

export const routerLogin = [
    { path: path.BOOKING_BY_DOCTOR, component: BookingAppointment },
    { path: path.BOOKING_BY_HOSPITAL, component: BookingAppointmentHospital },
];
