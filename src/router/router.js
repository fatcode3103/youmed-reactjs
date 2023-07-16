import { userIsAuthenticated } from "../utils/authentication";

import Home from "../containers/Home";
import DoctorAppointment from "../containers/DoctorAppointment";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import System from "../containers/System/System";
import { path } from "../utils/contants.js";

export const routerPublic = [
    { path: path.HOME, component: Home },
    { path: path.LOGIN, component: Login },
    { path: path.REGISTER, component: Register },
    { path: path.SYSTEM, component: userIsAuthenticated(System) },
];
