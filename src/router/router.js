import { path } from "../utils/constant.js";
import Home from "../containers/Home";
import LoginPage from "../components/Auth/LoginPage";
import Register from "../components/Auth/Register";
import System from "../containers/System/System";
import PageNotFound from "../components/PageNotFound";
import DoctorDetail from "../containers/Booking/DoctorDetail/DoctorDetail";
import { UserManage, SpecialtyManage } from "../containers/System/Admin";
import Booking from "../containers/Booking";
import DoctorManage from "../containers/System/Admin/DoctorManage";

export const routerPublic = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: LoginPage },
    { path: path.REGISTER, component: Register },
    { path: path.SYSTEM, component: System },
    { path: path.USER_MANAGE, component: UserManage },
    { path: path.SPECIALTY_MANAGE, component: SpecialtyManage },
    { path: path.DOCTOR_DETAIL, component: DoctorDetail },
    { path: path.BOOKING, component: Booking },
    { path: path.DOCTOR_MANAGE, component: DoctorManage },
    { path: "*", component: PageNotFound },
];
