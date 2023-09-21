import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { faBell, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./RenderBookingInfo.module.scss";
import Image from "../Image";
import {
    language as LANGUAGE,
    date as DATE,
    STATUS,
} from "../../utils/constant";
import BufferToBase64 from "../../utils/BufferToBase64";

const cx = classNames.bind(styles);

function RenderBookingInfo(props) {
    const { data, language, status: statusText } = props;

    const [iconStatus, setIconStatus] = useState("");
    const [colorIconStatus, setColorIconStatus] = useState("");

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

    useEffect(() => {
        if (status === STATUS.S1) {
            setIconStatus(faBell);
            setColorIconStatus("#1975dc");
        } else if (status === STATUS.S2) {
            setIconStatus(faCircleCheck);
            setColorIconStatus("#03b964");
        }
    }, [status]);

    return (
        <div className={cx("booking-info")}>
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
        </div>
    );
}

export default RenderBookingInfo;
