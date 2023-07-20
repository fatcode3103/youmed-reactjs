import { toast } from "react-toastify";
import { Translation } from "react-i18next";

import * as userService from "../../services/userService";
import * as adminAction from "../../features/admin/adminslice";

export const getAllUserAction = () => {
    return async (dispatch) => {
        dispatch(adminAction.getAllUserStart());
        try {
            let res = await userService.getAllUserApi();
            if (res && res.data.errorCode === 0) {
                dispatch(adminAction.getAllUserSuccess(res.data.data));
            } else {
                dispatch(adminAction.getAllUserFailed());
            }
        } catch (e) {
            dispatch(adminAction.getAllUserFailed());
        }
    };
};

export const getAllCodeAction = (type) => {
    return async (dispatch) => {
        dispatch(adminAction.getAllCodeStart());
        try {
            let res = await userService.getAllCodeApi(type);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    adminAction.getAllCodeSuccess({
                        type: type,
                        data: res.data.data,
                    })
                );
            } else {
                dispatch(adminAction.getAllCodeFailed());
            }
        } catch (e) {
            dispatch(adminAction.getAllCodeFailed());
        }
    };
};

export const postUserAction = (data) => {
    return async (dispatch) => {
        dispatch(adminAction.postUserStart());
        try {
            let res = await userService.postUserApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminAction.postUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.post_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminAction.postUserFailed());
                toast.error(
                    <Translation>
                        {(t) => <span>{t("toast.post_user_failed")} !</span>}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminAction.postUserFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.post_user_failed")} !</span>}
                </Translation>
            );
        }
    };
};

export const deleteUserAction = (id) => {
    return async (dispatch) => {
        dispatch(adminAction.deleteUserStart());
        try {
            let res = await userService.deleteUserApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(adminAction.deleteUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.delete_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminAction.deleteUserFailed());
                toast.error(
                    <Translation>
                        {(t) => <span>{t("toast.delete_user_failed")} !</span>}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminAction.deleteUserFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.delete_user_failed")} !</span>}
                </Translation>
            );
        }
    };
};

export const getUserByIdAction = (id) => {
    return async (dispatch) => {
        dispatch(adminAction.getUserByIdStart());
        try {
            let res = await userService.getUserByIdApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(adminAction.getUserByIdSuccess(res.data.data));
            } else {
                dispatch(adminAction.getUserByIdFailed());
            }
        } catch (e) {
            dispatch(adminAction.getUserByIdFailed());
        }
    };
};

export const editUserAction = (data) => {
    return async (dispatch) => {
        dispatch(adminAction.editUserStart());
        try {
            let res = await userService.editUserApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminAction.editUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.edit_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminAction.editUserFailed());
                toast.error(
                    <Translation>
                        {(t) => <span>{t("toast.edit_user_failed")} !</span>}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminAction.editUserFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.edit_user_failed")} !</span>}
                </Translation>
            );
            throw e;
        }
    };
};
