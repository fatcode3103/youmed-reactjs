import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { faBell, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import ButtonBootstrap from "react-bootstrap/Button";

import styles from "./RenderBookingInfo.module.scss";
import Image from "../Image";
import {
    language as LANGUAGE,
    date as DATE,
    STATUS,
} from "../../utils/constant";
import BufferToBase64 from "../../utils/BufferToBase64";
import Button from "../Button";
import { faBan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function RenderBookingInfo(props) {
    const { data, language, status: statusText } = props;

    const [iconStatus, setIconStatus] = useState("");
    const [colorIconStatus, setColorIconStatus] = useState("");
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    const {
        doctorBookingData,
        hospitalBookingData,
        clinicBookingData,
        patientBookingData,
        timeTypeBookingData,
        date,
        status,
        note,
    } = data;

    const dynamicEntity =
        doctorBookingData || hospitalBookingData || clinicBookingData;

    useEffect(() => {
        if (status === STATUS.S1) {
            setIconStatus(faBell);
            setColorIconStatus("#1975dc");
        } else if (status === STATUS.S2) {
            setIconStatus(faPenToSquare);
            setColorIconStatus("#03b964");
        } else if (status === STATUS.S3) {
            setIconStatus(faCircleCheck);
            setColorIconStatus("#03b964");
        } else if (status === STATUS.S4) {
            setIconStatus(faBan);
            setColorIconStatus("#666");
        }
    }, [status]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderName = (entity) => {
        if (
            entity &&
            entity.firstName &&
            entity.lastName &&
            entity.positionData
        ) {
            if (language === LANGUAGE.VN) {
                return `${entity.positionData.valueVi}, ${entity.lastName} ${entity.firstName}`;
            } else {
                return `${entity.positionData.valueEn}, ${entity.firstName} ${entity.lastName}`;
            }
        } else {
            return entity.name;
        }
    };

    const renderPatientName = (patient) => {
        if (patient && patient.firstName && patient.lastName) {
            if (language === LANGUAGE.VN) {
                return `${patient.lastName} ${patient.firstName}`;
            } else {
                return `${patient.firstName} ${patient.lastName}`;
            }
        }
    };

    const renderBase64Image = (data) => {
        if (data && data.logo && data.logo.data) {
            return BufferToBase64(data.logo.data);
        }
    };

    const renderDate = (timestamp) => {
        return capitalizeFirstLetter(
            moment(parseInt(timestamp))
                .locale(language === LANGUAGE.VN ? "vi" : "en")
                .format(
                    language === LANGUAGE.VN
                        ? DATE.DATE_CLIENT_VI
                        : DATE.DATE_CLIENT_EN
                )
        );
    };

    const renderDateOfBirth = (timestamp) => {
        return capitalizeFirstLetter(
            moment(parseInt(timestamp))
                .locale(language === LANGUAGE.VN ? "vi" : "en")
                .format(
                    language === LANGUAGE.VN
                        ? DATE.DATE_BIRTH_CLIENT_VI
                        : DATE.DATE_BIRTH_CLIENT_EN
                )
        );
    };

    const renderTime = (timeTypeBookingData) => {
        return language === LANGUAGE.VN
            ? timeTypeBookingData.valueVi
            : timeTypeBookingData.valueEn;
    };

    const renderGender = (data) => {
        return language === LANGUAGE.VN ? data.valueVi : data.valueEn;
    };

    const handleCloseConfirmCancel = () => setShow(false);

    const handleShowConfirmCancel = () => {
        renderModalConfirmCancel();
        setShow(true);
    };

    const handleConfirmCancel = () => {
        dispatch(actions.cancelAppointmentById(data.id, data.status));
        setShow(false);
    };

    const handleCancelAppointment = () => {
        handleShowConfirmCancel();
    };

    const renderModalConfirmCancel = () => {
        return (
            <Modal show={show} onHide={handleCloseConfirmCancel} centered>
                <Modal.Body>
                    Bạn chắc chắn muốn hủy lịch khám này không ?
                </Modal.Body>
                <Modal.Footer>
                    <ButtonBootstrap
                        variant="secondary"
                        onClick={handleCloseConfirmCancel}
                    >
                        Hủy
                    </ButtonBootstrap>
                    <ButtonBootstrap
                        variant="primary"
                        onClick={handleConfirmCancel}
                    >
                        Đồng ý
                    </ButtonBootstrap>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <div className={cx("booking-info")}>
            {renderModalConfirmCancel()}
            <div className={cx("booking-status")}>
                <FontAwesomeIcon
                    icon={iconStatus}
                    className={cx("status-icon")}
                    style={{ color: colorIconStatus }}
                />
                <span>{statusText}</span>
            </div>
            <div className={cx("booking-info-head")}>
                <Image src={renderBase64Image(dynamicEntity)} size="s" />
                <div className={cx("booking-info-head-text")}>
                    <p>{renderName(dynamicEntity)}</p>
                    <p>
                        {dynamicEntity.address
                            ? dynamicEntity.address
                            : "updating..."}
                    </p>
                </div>
                <Image
                    src="https://www.qrcode-gen.com/images/qrcode-default.png"
                    size="m"
                />
            </div>
            <div className={cx("entity-info")}>
                <p>Thông tin đặt khám</p>
                <div>
                    <span>Mã phiếu khám</span>
                    <span>YMA{data.id}</span>
                </div>
                <div>
                    <span>Ngày khám</span>
                    <span>{date && renderDate(date)}</span>
                </div>
                <div>
                    <span>Giờ khám</span>
                    <span>
                        {timeTypeBookingData && renderTime(timeTypeBookingData)}
                    </span>
                </div>
            </div>
            <div className={cx("patient-info")}>
                <p>Thông tin bệnh nhân</p>
                <div>
                    <span>Họ và tên</span>
                    <span>{renderPatientName(patientBookingData)}</span>
                </div>
                <div>
                    <span>Năm sinh</span>
                    <span>
                        {patientBookingData.dateOfBirth &&
                            renderDateOfBirth(patientBookingData.dateOfBirth)}
                    </span>
                </div>
                <div>
                    <span>Số điện thoại</span>
                    <span>
                        {patientBookingData.phoneNumber
                            ? patientBookingData.phoneNumber
                            : "updating..."}
                    </span>
                </div>
                <div>
                    <span>Giới tính</span>
                    <span>
                        {patientBookingData.genderData &&
                            renderGender(patientBookingData.genderData)}
                    </span>
                </div>
                <div>
                    <span>Địa chỉ</span>
                    <span>
                        {patientBookingData.address
                            ? patientBookingData.address
                            : "updating..."}
                    </span>
                </div>
                <div>
                    <span>Ghi chú</span>
                    <span>{note ? note : "updating..."}</span>
                </div>
            </div>
            <div className={cx("btn-cancel")}>
                <Button
                    disnabel={status === STATUS.S3}
                    cancel="true"
                    onClick={() => handleCancelAppointment()}
                >
                    {status === STATUS.S3 ? "Đã khám xong" : "Hủy lịch khám"}
                </Button>
            </div>
        </div>
    );
}

export default RenderBookingInfo;
