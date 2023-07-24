import { Translation } from "react-i18next";
import { toast } from "react-toastify";

import { postLoginApi } from "../../services/userService";
import * as userAction from "../../features/user/userSlice";
import { path } from "../../utils/contants";

export const loginAction = (userData, navigate) => {
    return async (dispatch) => {
        dispatch(userAction.loginStart());
        try {
            let res = await postLoginApi(userData);
            let { data, message } = res.data;
            if (res && res.data.errorCode === 0) {
                dispatch(userAction.loginSuccess({ data }));
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
                dispatch(userAction.loginFailed({ message }));
            }
        } catch (e) {
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.login_failed")} !</span>}
                </Translation>
            );
            dispatch(userAction.loginFailed());
        }
    };
};

export const logoutAction = (navigate) => {
    return async (dispatch) => {
        dispatch(userAction.logoutStart());
        try {
            dispatch(userAction.logoutSuccess());
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
            dispatch(userAction.logoutFailed());
        }
    };
};

export const changeLanguageAction = (code, title) => {
    return async (dispatch) => {
        dispatch(userAction.changeLanguageStart());
        try {
            dispatch(userAction.changeLanguageSuccess(code));
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
            dispatch(userAction.changeLanguageFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.language_error")} !</span>}
                </Translation>
            );
        }
    };
};
