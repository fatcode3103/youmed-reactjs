import { toast } from "react-toastify";

import { getUserApi, postLoginApi } from "../../services/userService";
import {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from "../../features/user/userSlice";
import { path } from "../../utils/contants";

export const loginAction = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            let res = await postLoginApi(userData);
            let { data, message } = res.data;
            if (res && res.data.errorCode === 0) {
                dispatch(loginSuccess({ data }));
                navigate(path.HOME);
                console.log("data.firstName: ", data.firstName);
                toast.success(`Xin chào ${data.firstName} ${data.lastName} !`);
            } else {
                dispatch(loginFailed({ message }));
                toast.error(message);
            }
        } catch (e) {
            dispatch(loginFailed());
            toast.error("Đăng nhập thất bại !");
        }
    };
};

export const logoutAction = (navigate) => {
    return async (dispatch) => {
        dispatch(logoutStart());
        try {
            dispatch(logoutSuccess());
            navigate(path.HOME);
            toast.success("Đăng xuất thành công !");
        } catch (e) {
            dispatch(logoutFailed());
            toast.error("Đăng xuất thất bại !");
        }
    };
};
