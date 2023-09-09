import { toast } from "react-toastify";
import { Translation } from "react-i18next";

import * as userService from "../../services/userService";
import * as adminslice from "../../features/admin/adminslice";
import * as specialtyService from "../../services/specialtyService";
import * as hospitalService from "../../services/hospitalService";
import * as clinicService from "../../services/clinicService";

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

export const getAllHospitalAction = (limit) => {
    return async (dispatch) => {
        dispatch(adminslice.getAllHospitalStart());
        try {
            let res = await hospitalService.getAllHospitalApi(limit);
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
                dispatch(adminslice.getHospitalByIdFailed());
            }
        } catch (e) {
            dispatch(adminslice.getHospitalByIdFailed());
        }
    };
};

export const updateHospitalDetailAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.updateHospitalDetailStart());
        try {
            let res = await hospitalService.updateHospitalDetailApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.updateHospitalDetailSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.updatde_hospital_detail_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.updateHospitalDetailFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.updatde_hospital_detail_failed")} !
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.updateHospitalDetailFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.updatde_hospital_detail_failed")} {e} !
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const createHospitalScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createHospitalDetailStart());
        try {
            let res = await hospitalService.createHospitalScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    adminslice.createHospitalScheduleSuccess(res.data.data)
                );
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_hospital_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createHospitalScheduleFailed());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_hospital_schedule_failed")} !
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createHospitalScheduleFailed());
            toast.success(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_hospital_schedule_failed")} {e}!
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getHospitalScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.getHospitalScheduleByIdStart());
        try {
            let res = await hospitalService.getHospitalScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    adminslice.getHospitalScheduleByIdSuccess(res.data.data)
                );
            } else {
                dispatch(adminslice.getHospitalScheduleByIdFailed());
            }
        } catch (e) {
            dispatch(adminslice.getHospitalScheduleByIdFailed());
        }
    };
};

export const updateHospitalcheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.updateHospitalScheduleByIdStart());
        try {
            let res = await hospitalService.updateHospitalScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.updateHospitalScheduleByIdSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_hospital_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.updateHospitalScheduleByIdFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_hospital_schedule_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.updateHospitalScheduleByIdFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.update_hospital_schedule_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const createClinicAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createClinicStart());
        try {
            let res = await clinicService.createClinicApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createClinicSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>{t("toast.create_clinic_success")} !</span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createClinicFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_clinic_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createClinicFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_clinic_failed")} !<span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getAllClinicAction = (limit) => {
    return async (dispatch) => {
        dispatch(adminslice.getAllClinicStart());
        try {
            let res = await clinicService.getAllClinicApi(limit);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.getAllClinicSuccess(res.data.data));
            } else {
                dispatch(adminslice.getAllClinicFailed());
            }
        } catch (e) {
            dispatch(adminslice.getAllClinicFailed());
        }
    };
};

export const createClinicDetailAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createClinicDetailStart());
        try {
            let res = await clinicService.createClinicDetailApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createClinicDetailSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_clinic_detail_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createClinicDetailFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_clinic_detail_failed")}
                                <span>{res.data.message}</span>
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createClinicDetailFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_clinic_detail_failed")} !
                            <span>{e}</span>
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const updateClinicDetailAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.updateClinicDetailStart());
        try {
            let res = await clinicService.updateClinicDetailApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.updateClinicDetailSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.updatde_clinic_detail_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.updateClinicDetailFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.updatde_clinic_detail_failed")} !
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.updateClinicDetailFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.updatde_clinic_detail_failed")} {e} !
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const createClinicScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.createClinicScheduleStart());
        try {
            let res = await clinicService.createClinicScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.createClinicScheduleSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_clinic_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.createClinicScheduleFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_clinic_schedule_failed")} !
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.createClinicScheduleFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_clinic_schedule_failed")} {e}!
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const getClinicScheduleAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.getClinicScheduleStart());
        try {
            let res = await clinicService.getClinicScheduleApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    adminslice.getClinicScheduleSuccess(res.data.data)
                );
            } else {
                dispatch(adminslice.getClinicScheduleFailed());
            }
        } catch (e) {
            dispatch(adminslice.getClinicScheduleFailed());
        }
    };
};

export const updateClinicScheduleByIdAction = (data) => {
    return async (dispatch) => {
        dispatch(adminslice.updateClinicScheduleByIdStart());
        try {
            let res = await clinicService.updateClinicScheduleByIdApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(adminslice.updateClinicScheduleByIdSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_clinic_schedule_success")} !
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(adminslice.updateClinicScheduleByIdFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.update_clinic_schedule_failed")} !
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(adminslice.updateClinicScheduleByIdFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.update_clinic_schedule_failed")} {e}!
                        </span>
                    )}
                </Translation>
            );
        }
    };
};
