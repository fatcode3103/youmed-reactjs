import { getUserApi, postLoginApi } from "../../services/userService";
import {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from "../../features/user/userSlice";

export const loginAction = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            let res = await postLoginApi(userData);
            let { data, message } = res.data;
            if (res && res.data.errorCode === 0) {
                dispatch(loginSuccess({ data, message }));
                navigate("/");
            } else {
                dispatch(loginFailed({ message }));
            }
        } catch (e) {
            dispatch(loginFailed());
        }
    };
};

export const logoutAction = (navigate) => {
    return async (dispatch) => {
        dispatch(logoutStart());
        try {
            dispatch(logoutSuccess());
            navigate("/");
        } catch (e) {
            dispatch(logoutFailed());
        }
    };
};
