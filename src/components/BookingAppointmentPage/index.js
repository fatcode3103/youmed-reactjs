import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingAppointmentPage.module.scss";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import BufferToBase64 from "../../utils/BufferToBase64";
import { language as LANGUAGE } from "../../utils/constant";
import * as actions from "../../app/actions";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppoimentPage(props) {
    ///props
    const {
        id,
        sectionStepData,
        infoById,
        renderSelectedDate,
        renderSelectedTime,
        renderNamePatient,
    } = props;

    //state
    const [selectedTime, setSelectedTime] = useState({});
    const [clickedBooking, setClickedBooking] = useState(false);
    const [visibleComponent, setVisibleComponent] = useState(0);

    //redux
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const { userById } = admin;
    const { language, selectedDate, selectedScheduleTime } = user;
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedTime(selectedScheduleTime);
    }, [selectedScheduleTime]);

    //function
    const handleRenderName = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const renderSpecialty = (doctor) => {
        if (doctor && doctor.specialtyData && doctor.specialtyData.length > 0) {
            let specialtyArr = doctor.specialtyData.map((item, index) => {
                return language === LANGUAGE.VN ? item.valueVi : item.valueEn;
            });
            return specialtyArr.join(", ");
        }
    };

    const handleImageBase64 = (doctor) => {
        let imgBase64 = "";
        if (doctor && doctor.image) {
            imgBase64 = BufferToBase64(doctor.image.data);
        }
        return imgBase64;
    };

    const handleClickTitleComponent = (index) => {
        setVisibleComponent(index);
    };

    const handleCompleteStep = () => {
        setVisibleComponent((prev) => prev + 1);
    };

    //sent data to server
    // booking
    const handleClickBtnBooking = async (data) => {
        if (data) {
            let dataSentToServer = {
                ...data,
                date: selectedDate.date,
                timeType: selectedTime.keyMap,
                doctorId: infoById.id,
                patientId: userById.id,
                sendToEmail: {
                    date: renderSelectedDate(selectedDate),
                    time: renderSelectedTime(selectedTime),
                    doctor: {
                        address: infoById.detailInfoData.address,
                        specialty: renderSpecialty(infoById),
                        doctorName: handleRenderName(infoById),
                    },
                    patient: {
                        patientName: renderNamePatient(userById),
                        phoneNumber: userById.phoneNumber,
                        email: userById.email,
                    },
                    language: language,
                },
            };
            console.log("check dataSentToServer:>>> ", dataSentToServer);
            await dispatch(
                actions.postPatientBookAppointmentAction(dataSentToServer)
            );
        }
        setClickedBooking(!clickedBooking);
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
                                <div>
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
                                    <div>
                                        {index <= visibleComponent && (
                                            <div
                                                className={cx("booking-action")}
                                                key={index}
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
                                                            handleClickBtnBooking={
                                                                handleClickBtnBooking
                                                            }
                                                            clickedBooking={
                                                                clickedBooking
                                                            }
                                                            handleCompleteStep={
                                                                handleCompleteStep
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
                                src={handleImageBase64(infoById)}
                            />
                            <div className={cx("short-info-doctor")}>
                                <p className={cx("doctor-name")}>
                                    {infoById &&
                                        infoById.positionData &&
                                        handleRenderName(infoById)}
                                </p>
                                <p className={cx("doctor-address")}>
                                    {infoById &&
                                    infoById.detailInfoData &&
                                    infoById.detailInfoData.address
                                        ? infoById.detailInfoData.address
                                        : ""}
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
                                                                        {
                                                                            e.value
                                                                        }
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
                                size="l"
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
