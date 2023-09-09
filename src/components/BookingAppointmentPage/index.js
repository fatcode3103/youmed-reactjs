import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./BookingAppointmentPage.module.scss";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faArrowRightLong,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { language as LANGUAGE } from "../../utils/constant";
import * as actions from "../../app/actions";
import { useTranslation } from "react-i18next";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppoimentPage(props) {
    ///props
    const {
        id,
        sectionStepData,
        avatarBookingBase64,
        nameBooking,
        addressBooking,
        scheduleById,
        dynamicEntity,
        renderSelectedTime,
        specialty,
        distinguishSubjectExamination,
    } = props;

    const { t } = useTranslation();

    //state
    const [visibleComponent, setVisibleComponent] = useState(0);
    const [dataFormChildrenComponent, setDataFormChildrenComponent] = useState(
        {}
    );

    const user = useSelector((state) => state.user);
    const { language, selectedScheduleTime } = user;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        setDataFormChildrenComponent((prev) => ({
            ...prev,
            language: language,
        }));
    }, [language]);

    const handleClickTitleComponent = (index) => {
        setVisibleComponent(index);
    };

    const handleCompleteStep = () => {
        setVisibleComponent((prev) => prev + 1);
    };

    //sent data to server
    const handleClickBtnBooking = async () => {
        if (!_.isEmpty(dataFormChildrenComponent)) {
            let dataSendToServer = {
                ...dataFormChildrenComponent,
            };
            await dispatch(
                actions.postPatientBookAppointmentAction(
                    dataSendToServer,
                    navigate
                )
            );
        }
    };

    const getDataFromChildrenComponent = (value) => {
        if (!_.isEmpty(value)) {
            setDataFormChildrenComponent((prev) => ({
                ...prev,
                ...value,
                distinguishSubjectExamination: distinguishSubjectExamination,
                entityId: dynamicEntity.id,
                language: language,
                entityInfo: [
                    {
                        label: t("email.dynamicEntity_name"),
                        value: nameBooking,
                    },
                    {
                        label: t("email.dynamicEntity_specialty"),
                        value: specialty,
                    },
                    {
                        label: t("email.dynamicEntity_address"),
                        value: addressBooking,
                    },
                    {
                        label: t("email.dynamicEntity_time"),
                        value: renderSelectedTime(selectedScheduleTime),
                    },
                ],
            }));
        }
    };

    return (
        <div className={cx("booking-appointment-content")}>
            {/* step */}
            <div className={cx("booking-step")}>
                {sectionStepData &&
                    sectionStepData.length > 0 &&
                    sectionStepData
                        .slice(0, visibleComponent + 1)
                        .map((item, index) => {
                            return (
                                <div key={index}>
                                    {index <= visibleComponent && (
                                        <div>
                                            <span>{index + 1}</span>
                                            <span>{item.title}</span>
                                            {index >= 0 &&
                                                index < visibleComponent && (
                                                    <FontAwesomeIcon
                                                        style={{
                                                            marginLeft: "10px",
                                                        }}
                                                        icon={faArrowRightLong}
                                                    />
                                                )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
            </div>

            <div className={cx("row")}>
                {/* booking action */}
                <div className={cx("col-8")}>
                    {sectionStepData &&
                        sectionStepData.length > 0 &&
                        sectionStepData
                            .slice(0, visibleComponent + 1)
                            .map((item, index) => {
                                let Component = item.component;
                                return (
                                    <div key={index}>
                                        {index <= visibleComponent && (
                                            <div
                                                className={cx("booking-action")}
                                            >
                                                <div
                                                    className={cx(
                                                        "booking-action-title"
                                                    )}
                                                    onClick={() =>
                                                        handleClickTitleComponent(
                                                            index
                                                        )
                                                    }
                                                >
                                                    <div>
                                                        <span>{index + 1}</span>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                    />
                                                </div>
                                                {index === visibleComponent && (
                                                    <div
                                                        className={cx(
                                                            "booking-section"
                                                        )}
                                                    >
                                                        <Component
                                                            lessList="5"
                                                            id={id}
                                                            handleCompleteStep={
                                                                handleCompleteStep
                                                            }
                                                            scheduleById={
                                                                scheduleById
                                                            }
                                                            getDataFromChildrenComponent={
                                                                getDataFromChildrenComponent
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                </div>

                {/* //booking infomartion */}
                <div className={cx("col-4")}>
                    <div className={cx("booking-info")}>
                        <div className={cx("booking-info-title")}>
                            <p>Thông tin đặt khám</p>
                            <hr
                                style={{
                                    margin: "0px",
                                    color: "#bbb",
                                }}
                            ></hr>
                        </div>

                        <div className={cx("doctor-info")}>
                            <Image
                                size="s"
                                br="true"
                                src={avatarBookingBase64}
                            />
                            <div className={cx("short-info-doctor")}>
                                <p className={cx("doctor-name")}>
                                    {nameBooking ?? "updating"}
                                </p>
                                <p className={cx("doctor-address")}>
                                    {addressBooking ?? "updating"}
                                </p>
                            </div>
                        </div>
                        <div className={cx("shcedule-info")}>
                            {sectionStepData &&
                                sectionStepData.length > 0 &&
                                sectionStepData
                                    .slice(0, visibleComponent + 1)
                                    .map((item, index) => {
                                        return (
                                            <div
                                                className={cx(
                                                    "schedule-info-item"
                                                )}
                                                key={index}
                                            >
                                                <span
                                                    className={cx(
                                                        "schedule-info-item-title"
                                                    )}
                                                >
                                                    {item.title}
                                                </span>
                                                <div>
                                                    {item.data &&
                                                        item.data.length > 0 &&
                                                        item.data.map(
                                                            (e, indx) => {
                                                                return (
                                                                    <span
                                                                        key={
                                                                            indx
                                                                        }
                                                                    >
                                                                        {e.value ?? (
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faInfoCircle
                                                                                }
                                                                            />
                                                                        )}
                                                                    </span>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    })}
                        </div>
                        <div className={cx("btn-booking-wrapper")}>
                            <Button
                                className={cx("btn-booking")}
                                disnabel={
                                    sectionStepData.length >
                                    visibleComponent + 1
                                }
                                normal={
                                    sectionStepData.length <=
                                    visibleComponent + 1
                                }
                                onClick={() => handleClickBtnBooking()}
                            >
                                Đặt lịch
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookingAppoimentPage;
