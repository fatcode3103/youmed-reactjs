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
import VerifyBookAppointment from "../components/VerifyBookAppointment";
import {
    HospitalManage,
    HospitalManageDetail,
    HospitalSchedule,
} from "../containers/System/Admin/HospitalManage";
import BookingAppointment from "../containers/Booking/BookingAppointmentDoctor";
import HospitalDetail from "../containers/Booking/HospitalDetail";
import BookingAppointmentHospital from "../containers/Booking/BookingAppointmentHospital";
import BookingAppointmentClinic from "../containers/Booking/BookingAppointmentClinic";
import {
    ClinicInfoManage,
    ClinicManageDetail,
    ClinicSchedule,
} from "../containers/System/Admin/ClinicManage";
import ClinicDetail from "../containers/Booking/ClinicDetail";
import BookingSuccessPage from "../components/BookingSuccessPage";
import Profile from "../containers/Profile";
import Schedule from "../containers/Schedule";
import Logout from "../components/Auth/Logout.js";
import BookingDoctor from "../containers/Booking/BookingDoctor";
import BookingClinic from "../containers/Booking/BookingClinic";
import BookingHospital from "../containers/Booking/BookingHospital";
import AdviseOnline from "../containers/AdviseOnline";
import HcpPage from "../containers/HcpPage";
import SearchPage from "../containers/SearchPage";
import SearchSpecilatyPage from "../containers/SearchSpecialtyPage";
import MedicalNews from "../containers/MedicalNews";
import ManageAppointment from "../containers/System/Doctor/ManageAppointment";
import SystemDoctor from "../containers/System/SystemDoctor.js";

export const routerPublic = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: LoginPage },
    { path: path.REGISTER, component: Register },
    { path: path.DOCTOR_DETAIL, component: DoctorDetail },
    { path: path.BOOKING, component: Booking },
    { path: path.VERIFY_BOOK_APPOINTMENT, component: VerifyBookAppointment },
    { path: path.HOSPITAL_DETAIL, component: HospitalDetail },
    { path: path.CLINIC_DETAIL, component: ClinicDetail },
    { path: path.ADVISE_ONLINE, component: AdviseOnline },
    { path: path.SEARCH, component: SearchPage },
    { path: path.SEARCH_SPECIALTY, component: SearchSpecilatyPage },
    { path: path.MEDICAL_NEWS, component: MedicalNews },
    { path: path.HCP, component: HcpPage },
    { path: path.LOGOUT, component: Logout },
    { path: "*", component: PageNotFound },
];

export const routerAdminPrivate = [
    { path: path.SYSTEM, component: System },
    { path: path.USER_MANAGE, component: UserManage },
    { path: path.DOCTOR_MANAGE, component: DoctorInfoManage },
    { path: path.DOCTOR_SCHEDULE, component: DoctorSchedule },
    { path: path.SPECIALTY_MANAGE, component: SpecialtyManage },
    { path: path.HOSPITAL_MANAGE, component: HospitalManage },
    { path: path.HOSPITAL_MANAGE_DETAIL, component: HospitalManageDetail },
    { path: path.HOSPITAL_SCHEDULE, component: HospitalSchedule },
    { path: path.CLINIC_MANAGE, component: ClinicInfoManage },
    { path: path.CLINIC_MANAGE_DETAIL, component: ClinicManageDetail },
    { path: path.CLINIC_SCHEDULE, component: ClinicSchedule },
];

export const routerDoctorPrivate = [
    { path: path.SYSTEM_DOCTOR, component: SystemDoctor },
    { path: path.MANAGE_APPOINTMNET, component: ManageAppointment },
];

export const routerLogin = [
    { path: path.BOOKING_BY_DOCTOR, component: BookingAppointment },
    { path: path.BOOKING_BY_HOSPITAL, component: BookingAppointmentHospital },
    { path: path.BOOKING_BY_CLINIC, component: BookingAppointmentClinic },
    { path: path.BOOKING_SUCCESS, component: BookingSuccessPage },
    { path: path.PROFILE_USER, component: Profile },
    { path: path.SCHEDULE, component: Schedule },
    { path: path.DOCTOR_APPOINTMENT, component: BookingDoctor },
    { path: path.HOSPITAL_APPOINTMENT, component: BookingHospital },
    { path: path.CLINIC_APPOINTMENT, component: BookingClinic },
];
