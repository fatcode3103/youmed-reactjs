import { Translation } from "react-i18next";
import { toast } from "react-toastify";

import * as userService from "../../services/userService";
import * as userSlice from "../../features/user/userSlice";
import { path } from "../../utils/constant";
import * as specialtyService from "../../services/specialtyService";
import * as hospitalService from "../../services/hospitalService";
import * as clinicService from "../../services/clinicService";
import * as searchService from "../../services/searchService";

var _ = require("lodash");

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

export const getAllDoctorAction = (limit) => {
    return async (dispatch) => {
        dispatch(userSlice.getAllDoctorStart());
        try {
            let res = await userService.getAllDoctorApi(limit);
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

export const setExaminationAction = (examination) => {
    return async (dispatch) => {
        try {
            dispatch(userSlice.setExamination(examination));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getAllSpecialtyAction = () => {
    return async (dispatch) => {
        dispatch(userSlice.getAllSpecialtyStart());
        try {
            let res = await specialtyService.getAllSpecialtyApi();
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getAllSpecialtySuccess(res.data.data));
            } else {
                dispatch(userSlice.getAllSpecialtyFailed());
            }
        } catch (e) {
            dispatch(userSlice.getAllSpecialtyFailed());
        }
    };
};

export const postPatientBookAppointmentAction = (data, navigate) => {
    return async (dispatch) => {
        dispatch(userSlice.postPatientBookAppointmentStart());
        try {
            let res = await userService.postPatientBookAppointmentApi(data);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.postPatientBookAppointmentSuccess());
                toast.success(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_book_appointment_successful")}!
                            </span>
                        )}
                    </Translation>
                );
                navigate(res.data.data);
            } else if (res && res.data.errorCode === -1) {
                dispatch(userSlice.postPatientBookAppointmentFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.book_appointment_available")}!
                            </span>
                        )}
                    </Translation>
                );
            } else {
                dispatch(userSlice.postPatientBookAppointmentFailed());
                toast.error(
                    <Translation>
                        {(t) => (
                            <span>
                                {t("toast.create_book_appointment_failed")}!
                            </span>
                        )}
                    </Translation>
                );
            }
        } catch (e) {
            dispatch(userSlice.postPatientBookAppointmentFailed());
            toast.error(
                <Translation>
                    {(t) => (
                        <span>
                            {t("toast.create_book_appointment_failed")}!
                        </span>
                    )}
                </Translation>
            );
        }
    };
};

export const postVerifyBookAppointmentAction = (data) => {
    const { patientId, token, ...entityId } = data;
    let validEntity;
    for (const property in entityId) {
        if (entityId[property] !== null) {
            validEntity = {
                key: property,
                value: entityId[property],
            };
        }
    }
    return async (dispatch) => {
        dispatch(userSlice.postVerifyBookAppointmentStart());
        try {
            let res = await userService.postVerifyBookAppointmentApi({
                validEntity,
                patientId,
                token,
            });
            if (res && res.data.errorCode === 0) {
                dispatch(
                    userSlice.postVerifyBookAppointmentSuccess(res.data.message)
                );
            } else if (res && res.data.errorCode === 2) {
                dispatch(
                    userSlice.postVerifyBookAppointmentFailed(res.data.message)
                );
            } else {
                dispatch(userSlice.postVerifyBookAppointmentFailed("Failed"));
            }
        } catch (e) {
            dispatch(userSlice.postVerifyBookAppointmentFailed(e));
        }
    };
};

export const getHospitalScheduleByIdAction = (hospitalId) => {
    return async (dispatch) => {
        dispatch(userSlice.getHospitalScheduleByIdStart());
        try {
            let res = await hospitalService.getHospitalScheduleByIdApi(
                hospitalId
            );
            if (res && res.data.errorCode === 0) {
                dispatch(
                    userSlice.getHospitalScheduleByIdSuccess(res.data.data)
                );
            } else {
                dispatch(userSlice.getHospitalScheduleByIdFailed());
            }
        } catch (e) {
            dispatch(userSlice.getHospitalScheduleByIdFailed());
        }
    };
};

export const getClinicByIdAction = (clinicId) => {
    return async (dispatch) => {
        dispatch(userSlice.getClinicByIdStart());
        try {
            let res = await clinicService.getClinicByIdApi(clinicId);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getClinicByIdSuccess(res.data.data));
            } else {
                dispatch(userSlice.getClinicByIdFailed());
            }
        } catch (e) {
            dispatch(userSlice.getClinicByIdFailed());
        }
    };
};

export const getClinicScheduleByIdAction = (clinicId) => {
    return async (dispatch) => {
        dispatch(userSlice.getClinicScheduleByIdStart());
        try {
            let res = await clinicService.getClinicScheduleByIdApi(clinicId);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getClinicScheduleByIdSuccess(res.data.data));
            } else {
                dispatch(userSlice.getClinicScheduleByIdFailed());
            }
        } catch (e) {
            dispatch(userSlice.getClinicScheduleByIdFailed());
        }
    };
};

export const postSuccessBookAppointmentAction = (data) => {
    const { patientId, token } = data;
    return async (dispatch) => {
        dispatch(userSlice.postSuccessBookAppointmentStart());
        try {
            let res = await userService.postSuccessBookAppointmentApi({
                patientId,
                token,
            });
            if (res && res.data.errorCode === 0) {
                dispatch(
                    userSlice.postSuccessBookAppointmentSuccess(
                        res.data.errorCode
                    )
                );
            } else {
                dispatch(userSlice.postSuccessBookAppointmentFailed());
            }
        } catch (e) {
            dispatch(userSlice.postSuccessBookAppointmentFailed(e));
        }
    };
};

export const getBookingAppointmentAction = (patientId) => {
    return async (dispatch) => {
        dispatch(userSlice.getBookingAppointmentStart());
        try {
            let res = await userService.getBookingAppointmentApi(patientId);
            if (res && res.data.errorCode === 0) {
                dispatch(userSlice.getBookingAppointmentSuccess(res.data.data));
            } else {
                dispatch(userSlice.getBookingAppointmentFailed());
            }
        } catch (e) {
            dispatch(userSlice.getBookingAppointmentFailed(e));
        }
    };
};

export const postQuerySearchAction = ({ navigate, ...queryParameter }) => {
    return async (dispatch) => {
        dispatch(userSlice.postQuerySearchStart());
        try {
            let res = await searchService.postQuerySearchApi(queryParameter);
            if (res && res.data.errorCode === 0) {
                dispatch(
                    userSlice.postQuerySearchSuccess(res.data.data.result)
                );
                navigate(res.data.data.linkSearchResult);
            } else {
                dispatch(userSlice.postQuerySearchFailed());
            }
        } catch (e) {
            dispatch(userSlice.postQuerySearchFailed());
        }
    };
};

export const postQuerySearchSpecialtyAction = ({
    navigate,
    ...queryParameter
}) => {
    return async (dispatch) => {
        dispatch(userSlice.postQuerySearchSpecialtyStart());
        try {
            let res = await searchService.postQuerySearchSpecialtyApi(
                queryParameter
            );
            if (res && res.data.errorCode === 0) {
                dispatch(
                    userSlice.postQuerySearchSpecialtySuccess(
                        res.data.data.result
                    )
                );
                navigate(res.data.data.linkSearchResult);
            } else {
                dispatch(userSlice.postQuerySearchSpecialtyFailed());
            }
        } catch (e) {
            dispatch(userSlice.postQuerySearchSpecialtyFailed());
        }
    };
};
