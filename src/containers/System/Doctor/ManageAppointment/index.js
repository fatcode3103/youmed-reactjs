import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./ManageAppointment.module.scss";
import HeaderSystemDoctor from "../../../../components/Header/HeaderSystemDoctor";
import Button from "../../../../components/Button";
import * as actions from "../../../../app/actions";
import Loading from "../../../../components/Loading";
import {
    language as LANGUAGE,
    date as DATE,
    STATUS,
} from "../../../../utils/constant";
import moment from "moment";

const cx = classNames.bind(styles);

function ManageAppointment() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [changeActionConfirm, setChangeActionConfirm] = useState(false);
    const [
        examinationAppointmentDoctorArr,
        setExaminationAppointmentDoctorArr,
    ] = useState([]);

    const { examinationAppointmentDoctor, isLoading, currentUser, language } =
        user;

    useEffect(() => {
        dispatch(actions.getAppointmentDoctorByIdAction(currentUser.id));
    }, [dispatch, changeActionConfirm]);

    useEffect(() => {
        setExaminationAppointmentDoctorArr(examinationAppointmentDoctor);
    }, [examinationAppointmentDoctor]);

    const renderNamePatient = (userData) => {
        if (userData.firstName && userData.lastName) {
            return language === LANGUAGE.VN
                ? `${userData.lastName} ${userData.firstName}`
                : `${userData.firstName} ${userData.lastName}`;
        }
    };

    const renderGender = (genderObj) => {
        if (genderObj) {
            return language === LANGUAGE.VN
                ? genderObj.valueVi
                : genderObj.valueEn;
        }
    };

    const renderBirthOfDay = (dateTimestamp) => {
        return moment(dateTimestamp).format(
            language === LANGUAGE.VN
                ? DATE.DATE_BIRTH_CLIENT_VI
                : DATE.DATE_BIRTH_CLIENT_EN
        );
    };

    const renderAppointmentStatus = (statusObj) => {
        return language === LANGUAGE.VN ? statusObj.valueVi : statusObj.valueEn;
    };

    const handleCompleteAppointment = (token) => {
        dispatch(actions.completeAppointmetAction(token));
        setChangeActionConfirm(!changeActionConfirm);
    };

    const renderTextButton = (status) => {
        let text = "";
        switch (status) {
            case STATUS.S1:
                text = "Chưa xác nhận";
                break;
            case STATUS.S2:
                text = "Xác nhận khám xong";
                break;
            case STATUS.S3:
                text = "Đã khám xong";
                break;
            case STATUS.S4:
                text = "Đã hủy";
                break;
            default:
                text = "missing status";
        }
        return text;
    };

    return (
        <div className={cx("manage-appointment-container")}>
            {isLoading && <Loading />}
            <HeaderSystemDoctor />
            <div className={cx("manage-appointmnet-content")}>
                <div className={cx("table-title")}>Quản lý lịch đặt khám</div>
                <table className={cx("manage-appointmnet-table")}>
                    <tr>
                        <th>STT</th>
                        <th>Họ tên bệnh nhân</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Xác nhận khám xong</th>
                    </tr>
                    {examinationAppointmentDoctorArr &&
                        examinationAppointmentDoctorArr.length > 0 &&
                        examinationAppointmentDoctorArr.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.patientBookingData &&
                                            renderNamePatient(
                                                item.patientBookingData
                                            )}
                                    </td>
                                    <td>
                                        {item.patientBookingData &&
                                            renderBirthOfDay(
                                                +item.patientBookingData
                                                    .dateOfBirth
                                            )}
                                    </td>
                                    <td>
                                        {item.patientBookingData &&
                                            renderGender(
                                                item.patientBookingData
                                                    .genderData
                                            )}
                                    </td>
                                    <td>
                                        {item.patientBookingData &&
                                            item.patientBookingData.address}
                                    </td>
                                    <td>
                                        {item.patientBookingData &&
                                            item.patientBookingData.phoneNumber}
                                    </td>
                                    <td>
                                        {item.statusBookingData &&
                                            renderAppointmentStatus(
                                                item.statusBookingData
                                            )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button
                                            disnabel={item.status !== STATUS.S2}
                                            update="true"
                                            size="s"
                                            onClick={() =>
                                                handleCompleteAppointment(
                                                    item.token
                                                )
                                            }
                                        >
                                            {renderTextButton(item.status)}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </table>
            </div>
        </div>
    );
}

export default ManageAppointment;
