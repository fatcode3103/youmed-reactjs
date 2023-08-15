import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

import styles from "./BookingAppointmentDoctor.module.scss";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading";
import BookingSection from "../../../components/BookingSection";
import Footer from "../../../components/Footer";
import DownloadAppSection from "../../Home/DownloadAppSection";
import * as actions from "../../../app/actions";
import Image from "../../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faArrowRightLong,
    faCheck,
    faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import PatientProfile from "../../../components/PatientProfileBooking";
import BufferToBase64 from "../../../utils/BufferToBase64";
import { language as LANGUAGE, date } from "../../../utils/constant";
import Button from "../../../components/Button";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppointment() {
    let { id } = useParams();
    const [selectedTime, setSelectedTime] = useState({});
    const [clickedBooking, setClickedBooking] = useState(false);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const { userById } = admin;
    const {
        selectedScheduleTime,
        doctorById,
        isLoading,
        language,
        selectedDate,
        dateDefault,
        currentUser,
    } = user;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getDoctorByIdAction(id));
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch]);

    useEffect(() => {
        setSelectedTime(selectedScheduleTime);
    }, [selectedScheduleTime]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    const handleImageBase64 = (doctor) => {
        let imgBase64 = "";
        if (doctor.image) {
            imgBase64 = BufferToBase64(doctor.image.data);
        }
        return imgBase64;
    };

    const handleRenderDoctorName = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const handleShowBookingSection = () => {
        setSelectedTime({});
        dispatch(actions.setSelectedDateAction(dateDefault));
    };

    const renderSelectedDate = (dateObj) => {
        let res;
        if (language === LANGUAGE.VN) {
            res = moment(+dateObj.date)
                .locale("vi")
                .format(date.DATE_CLIENT_VI);
        } else {
            res = moment(+dateObj.date)
                .locale("en")
                .format(date.DATE_CLIENT_EN);
        }
        return res[0].toUpperCase() + res.slice(1);
    };

    const renderSelectedTime = (timeObj) => {
        if (language === LANGUAGE.VN) {
            return timeObj.valueVi;
        } else {
            return timeObj.valueEn;
        }
    };

    const renderNamePatient = (user) => {
        if (language === LANGUAGE.VN) {
            return `${user.lastName} ${user.firstName}`;
        } else {
            return `${user.firstName} ${user.lastName}`;
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

    //sent data to server
    const handleClickBtnBooking = async (data) => {
        if (data) {
            let dataSentToServer = {
                ...data,
                date: selectedDate.date,
                timeType: selectedTime.keyMap,
                doctorId: doctorById.id,
                patientId: userById.id,
                sendToEmail: {
                    date: renderSelectedDate(selectedDate),
                    time: renderSelectedTime(selectedTime),
                    doctor: {
                        address: doctorById.detailInfoData.address,
                        specialty: renderSpecialty(doctorById),
                        doctorName: handleRenderDoctorName(doctorById),
                    },
                    patient: {
                        patientName: renderNamePatient(userById),
                        phoneNumber: userById.phoneNumber,
                        email: userById.email,
                    },
                    language: language,
                },
            };
            // console.log("check dataSentToServer:>>> ", userById);
            await dispatch(
                actions.postPatientBookAppointmentAction(dataSentToServer)
            );
        }
        setClickedBooking(!clickedBooking);
    };

    return (
        <div>
            {isLoading && <Loading />}
            <div className={cx("booking-appointment-container")}>
                <Header />
                <div className={cx("booking-appointment-content")}>
                    <div className={cx("booking-step")}>
                        {_.isEmpty(selectedTime) ? (
                            <div>
                                <span>1</span>
                                <span>Thời gian khám</span>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={cx("step1")}
                                    onClick={() => setSelectedTime({})}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        style={{
                                            backgroundColor: "#1975de",
                                            color: "#fff",
                                            padding: "4px 6px",
                                            borderRadius: "3px",
                                        }}
                                    />
                                    <span>Thời gian khám</span>
                                </div>
                                <FontAwesomeIcon icon={faArrowRightLong} />
                                <div>
                                    <span>2</span>
                                    <span>Bệnh nhân</span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("col-8")}>
                            <div className={cx("booking-action")}>
                                <div
                                    className={cx("booking-action-title")}
                                    onClick={() => handleShowBookingSection()}
                                >
                                    <div>
                                        <span>1</span>
                                        <span>Ngày và giờ khám</span>
                                    </div>
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                                {_.isEmpty(selectedTime) && (
                                    <div className={cx("booking-section")}>
                                        <BookingSection
                                            lessList="5"
                                            doctorId={id}
                                        />
                                    </div>
                                )}
                            </div>
                            {!_.isEmpty(selectedTime) && (
                                <div className={cx("booking-action")}>
                                    <div className={cx("booking-action-title")}>
                                        <div>
                                            <span>2</span>
                                            <span>Hồ sơ bệnh nhân</span>
                                        </div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <PatientProfile
                                        handleClickBtnBooking={
                                            handleClickBtnBooking
                                        }
                                        clickedBooking={clickedBooking}
                                    />
                                </div>
                            )}
                        </div>
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
                                        src={handleImageBase64(doctorById)}
                                    />
                                    <div className={cx("short-info-doctor")}>
                                        <p className={cx("doctor-name")}>
                                            {doctorById &&
                                                doctorById.positionData &&
                                                handleRenderDoctorName(
                                                    doctorById
                                                )}
                                        </p>
                                        <p className={cx("doctor-address")}>
                                            {doctorById &&
                                            doctorById.detailInfoData &&
                                            doctorById.detailInfoData.address
                                                ? doctorById.detailInfoData
                                                      .address
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                                <div className={cx("shcedule-info")}>
                                    <div className={cx("schedule-info-item")}>
                                        <span>Ngày khám</span>
                                        <span>
                                            {!_.isEmpty(selectedDate) &&
                                            selectedDate.date ? (
                                                renderSelectedDate(selectedDate)
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faExclamation}
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <div className={cx("schedule-info-item")}>
                                        <span>Khung giờ</span>
                                        <span>
                                            {!_.isEmpty(selectedTime) ? (
                                                renderSelectedTime(selectedTime)
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faExclamation}
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <div className={cx("schedule-info-item")}>
                                        <span>Bệnh nhân</span>
                                        <span>
                                            {userById &&
                                                renderNamePatient(userById)}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx("btn-booking-wrapper")}>
                                    <Button
                                        className={cx("btn-booking")}
                                        size="l"
                                        disnabel={_.isEmpty(selectedTime)}
                                        normal={!_.isEmpty(selectedTime)}
                                        onClick={() => handleClickBtnBooking()}
                                    >
                                        Đặt lịch
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default BookingAppointment;
