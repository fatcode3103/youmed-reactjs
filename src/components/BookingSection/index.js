import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";

import "./Slider.scss";
import styles from "./BookingSection.module.scss";
import Button from "../Button";
import { language as LANGUAGE, date } from "../../utils/constant";
import * as actions from "../../app/actions";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppointment(props) {
    const { lessList, doctorId, getDateDefault } = props;
    const slider = useRef();
    const { t } = useTranslation();
    const [isDateActive, setIsDateActive] = useState(0);
    const [doctorTime, setDoctorTime] = useState({});

    const settings = {
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 500,
        slidesToShow: lessList ? lessList : 6,
        slidesToScroll: 1,
        arrows: false,
    };

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { time } = admin;
    const { doctorById, language, isLogin, doctorScheduleById } = user;

    useEffect(() => {
        dispatch(actions.getDoctorScheduleByIdAction(doctorId));
        dispatch(actions.getAllCodeAction("TIME"));
        dispatch(actions.getDoctorByIdAction(doctorId));
    }, [dispatch, doctorId]);

    useEffect(() => {
        setDoctorTime(filterCurrentFutureDate()[0]);
    }, [doctorScheduleById]);

    const handleClickBtnTime = (time) => {
        if (!isLogin) {
            toast.info(t("toast.login_redirect"));
        } else {
            dispatch(actions.setScheduleTimeAction(time));
        }
    };

    const handleNameUrl = (doctor) => {
        const name = doctor.firstName + " " + doctor.lastName;
        const nameUrl = name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/(\s+)/g, "-");
        return nameUrl;
    };

    const handleRenderTimeByLanguage = (date) => {
        const timeArr = JSON.parse(date.timeType);
        const nameUrl = handleNameUrl(doctorById);
        const renderTime = time.map((item, index) => {
            if (timeArr.includes(item.keyMap)) {
                return (
                    <Button
                        key={index}
                        to={`/booking/${nameUrl}/id=/${doctorById.id}/booking`}
                        onClick={() => handleClickBtnTime(item)}
                        outline
                    >
                        {language === LANGUAGE.VN ? item.valueVi : item.valueEn}
                    </Button>
                );
            }
        });
        return renderTime;
    };

    const handleDateActive = (index) => {
        isDateActive !== index && setIsDateActive(index);
    };

    const handleClickDateTag = (item = filterCurrentFutureDate()[0], index) => {
        handleDateActive(index);
        setDoctorTime(item);
        dispatch(actions.setSelectedDateAction(item));
    };

    const getCurrentTimestampDate = () => {
        return moment(new Date()).startOf("day").valueOf();
    };

    const filterCurrentFutureDate = () => {
        const filter = doctorScheduleById.filter(
            (item) => parseInt(item.date) >= getCurrentTimestampDate()
        );
        dispatch(actions.setDateDefaultAction(filter[0]));
        return filter;
    };

    const renderNumOfTimeFrame = (timeType) => {
        return JSON.parse(timeType).length;
    };

    return (
        <div className={cx("schedule")}>
            <div className={cx("schedule-content")}>
                <div className={cx("date")}>
                    <div className={cx("btn-slider")}>
                        <button
                            className={cx("btn-prev")}
                            onClick={() => slider.current.slickPrev()}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button
                            className={cx("btn-next")}
                            onClick={() => slider.current.slickNext()}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                    <Slider {...settings} ref={slider}>
                        {doctorScheduleById &&
                            doctorScheduleById.length > 0 &&
                            filterCurrentFutureDate().map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx("date-tag", {
                                            "date-active":
                                                isDateActive === index,
                                        })}
                                        onClick={() =>
                                            handleClickDateTag(item, index)
                                        }
                                    >
                                        <p>
                                            {moment(parseInt(item.date))
                                                .locale(
                                                    language === LANGUAGE.VN
                                                        ? "vi"
                                                        : "en"
                                                )
                                                .format(
                                                    language === LANGUAGE.VN
                                                        ? date.DATE_CLIENT_VI
                                                        : date.DATE_CLIENT_EN
                                                )}
                                        </p>
                                        <p>
                                            {renderNumOfTimeFrame(
                                                item.timeType
                                            )}{" "}
                                            khung giờ
                                        </p>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
                <div className={cx("time-content")}>
                    {!_.isEmpty(doctorTime) &&
                        handleRenderTimeByLanguage(doctorTime)}
                </div>
            </div>
        </div>
    );
}

export default BookingAppointment;
