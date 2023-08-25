import { toast } from "react-toastify";
import { Translation } from "react-i18next";

import * as userService from "../../services/userService";
import * as adminslice from "../../features/admin/adminslice";
import * as specialtyService from "../../services/specialtyService";
import * as hospitalService from "../../services/hospitalService";

export const getAllUserAction = () => {
    return async (dispatch) => {
        dispatch(adminslice.getAllUserStart());
        try {
            let res = await userService.getAllUserApi();
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getAllUserSuccess(res.data.data));
            } else {
                dispatch(adminslice.getAllUserFailed());
            }
        } catch (e) {
            dispatch(adminslice.getAllUserFailed());
        }
    };
};

export const getAllCodeAction = (type) => {
    return async (dispatch) => {
        dispatch(adminslice.getAllCodeStart());
        try {
            let res = await userService.getAllCodeApi(type);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    adminslice.getAllCodeSuccess({
                        type: type,
                        data: res.data.data,
                    })
                );
            } else {
                dispatch(adminslice.getAllCodeFailed());
            }
        } catch (e) {
            dispatch(adminslice.getAllCodeFailed());
        }
    };
};

export const postUserAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.postUserStart());
        try {
            let res = await userService.postUserApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.postUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.post_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminslice.postUserFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <>
                                <p>{t("toast.post_user_failed")} !</p>
                                <span>{res.data.message}</span>
                            </>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.postUserFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.post_user_failed")} <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const deleteUserAction = (id) => {
    return async (dispatch) => {
        dispatch(adminslice.deleteUserStart());
        try {
            let res = await userService.deleteUserApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.deleteUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.delete_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminslice.deleteUserFailed());
                toast.error(
                    <Translation>
                        {(t) => <span>{t("toast.delete_user_failed")} !</span>}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.deleteUserFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.delete_user_failed")} <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getUserByIdAction = (id) => {
    return async (dispatch) => {
        dispatch(adminslice.getUserByIdStart());
        try {
            let res = await userService.getUserByIdApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getUserByIdSuccess(res.data.data));
            } else {
                dispatch(adminslice.getUserByIdFailed());
            }
        } catch (e) {
            dispatch(adminslice.getUserByIdFailed());
        }
    };
};

export const editUserAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.editUserStart());
        try {
            let res = await userService.editUserApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.editUserSuccess());
                toast.success(
                    <Translation>
                        {(t) => <span>{t("toast.edit_user_success")} !</span>}
                    </Translation>
                );
            } else {
                dispatch(adminslice.editUserFailed());
                toast.error(
                    <Translation>
                        {(t) => <span>{t("toast.edit_user_failed")} !</span>}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.editUserFailed());
            toast.error(
                <Translation>
                    {(t) => <span>{t("toast.edit_user_failed")}</span>}
                    <span>{e}</span>
                </Translation>
            );
            throw e;
        }
    };
};

export const postDoctorInfoByIdAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.postDoctorInfoByIdStart());
        try {
            let res = await userService.postDoctorInfoByIdApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.postDoctorInfoByIdSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.post_doctor_info_success")} !</span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.postDoctorInfoByIdFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <>
                                <p>{t("toast.post_doctor_info_failed")} !</p>
                                <span>{res.data.message}</span>
                            </>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.postDoctorInfoByIdFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast._doctor_info_failed")} <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getDoctorDetailInfoAction = (id) => {
    return async (dispatch) => {
        dispatch(adminslice.getDoctorDetailInfoStart());
        try {
            let res = await userService.getDoctorDetailInfoApi(id);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getDoctorDetailInfoSuccess(res.data.data));
            } else {
                dispatch(adminslice.getDoctorDetailInfoFailed());
            }
        } catch (e) {
            dispatch(adminslice.getDoctorDetailInfoFailed());
        }
    };
};

export const putDoctorDetailInfoAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.putDoctorDetailInfoStart());
        try {
            let res = await userService.putDoctorDetailInfoApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.putDoctorDetailInfoSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.put_doctor_detail_info_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.putDoctorDetailInfoFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.put_doctor_detail_info_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.putDoctorDetailInfoFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.put_doctor_detail_info_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const postDoctorScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.postDoctorScheduleStart());
        try {
            let res = await userService.postDoctorScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.postDoctorScheduleSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.post_doctor_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.postDoctorScheduleFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.post_doctor_schedule_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.postDoctorScheduleFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.post_doctor_schedule_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getDoctorScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.getDoctorScheduleStart());
        try {
            let res = await userService.getDoctorScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getDoctorScheduleSuccess(res.data.data));
            } else {
                dispatch(adminslice.getDoctorScheduleFailed());
            }
        } catch (e) {
            dispatch(adminslice.getDoctorScheduleFailed());
        }
    };
};

export const updateDoctorScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.updateDoctorScheduleStart());
        try {
            let res = await userService.updateDoctorScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.updateDoctorScheduleSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_doctor_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.updateDoctorScheduleFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_doctor_schedule_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.updateDoctorScheduleFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.update_doctor_schedule_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const createSpecialtyAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createSpecialtyStart());
        try {
            let res = await specialtyService.createSpecialtyApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createSpecialtySuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_specialty_success")} !</span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createSpecialtyFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_specialty_failed")} !</span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createSpecialtyFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_specialty_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const createHospitalAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createHospitalStart());
        try {
            let res = await hospitalService.creatHospitalApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createHospitalSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_hospital_success")} !</span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createSpecialtyFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_hospital_failed")} !</span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createSpecialtyFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_hospital_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getAllHospitalAction = () => {
    return async (dispatch) => {
        dispatch(adminslice.getAllHospitalStart());
        try {
            let res = await hospitalService.getAllHospitalApi();
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getAllHospitalSuccess(res.data.data));
            } else {
                dispatch(adminslice.getAllHospitalFailed());
            }
        } catch (e) {
            dispatch(adminslice.getAllHospitalFailed());
        }
    };
};

export const createHospitalDetailAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createHospitalDetailStart());
        try {
            let res = await hospitalService.createHospitalDetailApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createHospitalDetailSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_hospital_success")} !</span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createHospitalDetailFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_hospital_failed")} !</span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createHospitalDetailFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_hospital_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getHospitalByIdAction = (hospitalId) => {
    return async (dispatch) => {
        dispatch(adminslice.getHospitalByIdStart());
        try {
            let res = await hospitalService.getHospitalByIdApi(hospitalId);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getHospitalByIdSuccess(res.data.data));
            } else {
                dispatch(adminslice.getHospitalByIdlFailed());
            }
        } catch (e) {
            dispatch(adminslice.getHospitalByIdlFailed());
        }
    };
};
