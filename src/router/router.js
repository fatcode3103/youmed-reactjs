import Home from "../containers/Home";
import DoctorAppointment from "../containers/DoctorAppointment";
import LoginPage from "../components/Auth/LoginPage";
import Register from "../components/Auth/Register";
import System from "../containers/System/System";
import PageNotFound from "../components/PageNotFound";
import { path } from "../utils/contants.js";

export const routerPublic = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: LoginPage },
    { path: path.REGISTER, component: Register },
    { path: path.SYSTEM, component: System },
    { path: "*", component: PageNotFound },
];
