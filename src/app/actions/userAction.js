import { Translation } from "react-i18next";
import { toast } from "react-toastify";

import * as userService from "../../services/userService";
import * as userSlice from "../../features/user/userSlice";
import { path } from "../../utils/constant";

export const loginAction = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(userSlice.loginStart());
        try {
            let res = await userService.postLoginApi(userData);
            let { data, message } = res.data;
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.loginSuccess({ data }));
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.welcome")}{" "}
                                <span style={{ color: "#1975dc" }}>
                                    {data.firstName} {data.lastName}
                                </span>{" "}
                                !
                            </span>
                        )}
                    </Translation>
                );
                navigate(path.HOME);
            } else {
                toast.error(message);
                dispatch(userSlice.loginFailed());
            }
        } catch (e) {
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.login_failed")} !</span>}
                </Translation>
            );
            dispatch(userSlice.loginFailed());
        }
    };
};

export const logoutAction = (navigate) => {
    return async (dispatch) => {
        dispatch(userSlice.logoutStart());
        try {
            dispatch(userSlice.logoutSuccess());
            toast.success(
                <Translation>
                    {(t) => <span>{t("toast.logout_successful")} !</span>}
                </Translation>
            );
            navigate(path.HOME);
        } catch (e) {
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.logout_failed")} !</span>}
                </Translation>
            );
            dispatch(userSlice.logoutFailed());
        }
    };
};

export const changeLanguageAction = (code, title) => {
    return async (dispatch) => {
        dispatch(userSlice.changeLanguageStart());
        try {
            dispatch(userSlice.changeLanguageSuccess(code));
            toast.success(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.current_language")}: {title}
                        </span>
                    )}
                </Translation>
            );
        } catch (e) {
            dispatch(userSlice.changeLanguageFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.language_error")} !</span>}
                </Translation>
            );
        }
    };
};

export const getAllDoctorAction = () => {
    return async (dispatch) => {
        dispatch(userSlice.getAllDoctorStart());
        try {
            let res = await userService.getAllDoctorApi();
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getAllDoctorSuccess(res.data.data));
            } else {
                dispatch(userSlice.getAllDoctorFailed());
            }
        } catch (e) {
            dispatch(userSlice.getAllDoctorFailed());
        }
    };
};

export const getDoctorByIdAction = (doctorId) => {
    return async (dispatch) => {
        dispatch(userSlice.getDoctorByIdStart());
        try {
            let res = await userService.getDoctorByIdApi(doctorId);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getDoctorByIdSuccess(res.data.data));
            } else {
                dispatch(userSlice.getDoctorByIdFailed());
            }
        } catch (e) {
            dispatch(userSlice.getDoctorByIdFailed());
        }
    };
};

export const getDoctorScheduleByIdAction = (id) => {
    return async (dispatch) => {
        dispatch(userSlice.getDoctorScheduleByIdStart());
        try {
            let res = await userService.getDoctorScheduleByIdApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getDoctorScheduleByIdSuccess(res.data.data));
            } else {
                dispatch(userSlice.getDoctorScheduleByIdFailed());
            }
        } catch (e) {
            dispatch(userSlice.getDoctorScheduleByIdFailed());
        }
    };
};

export const setScheduleTimeAction = (time) => {
    return async (dispatch) => {
        try {
            dispatch(userSlice.setScheduleTime(time));
        } catch (e) {
            console.log(e);
        }
    };
};

export const setSelectedDateAction = (date) => {
    return async (dispatch) => {
        try {
            dispatch(userSlice.setSelectedDate(date));
        } catch (e) {
            console.log(e);
        }
    };
};

export const setDateDefaultAction = (date) => {
    return async (dispatch) => {
        try {
            dispatch(userSlice.setDateDefault(date));
        } catch (e) {
            console.log(e);
        }
    };
};
