import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
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

function BookingSection(props) {
    const {
        lessList,
        id,
        handleCompleteStep,
        type,
        scheduleById,
        getDataFromChildrenComponent,
    } = props;
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

    const { language, isLogin, dateDefault, doctorById } = user;

    useEffect(() => {
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch, id]);

    useEffect(() => {
        setDoctorTime(dateDefault);
    }, [dateDefault]);

    const handleClickBtnTime = (time) => {
        if (!isLogin) {
            toast.info(t("toast.login_redirect"));
        } else {
            dispatch(actions.setScheduleTimeAction(time));
            dispatch(actions.setSelectedDateAction(doctorTime));
            getDataFromChildrenComponent({
                timeType: time.keyMap,
                date: doctorTime.date,
            });
            if (handleCompleteStep) {
                handleCompleteStep();
            }
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
        const renderTime = time.map((item, index) => {
            if (timeArr.includes(item.keyMap)) {
                return (
                    <Button
                        key={index}
                        to={
                            type === "doctor"
                                ? `/booking/${handleNameUrl(
                                      doctorById
                                  )}/id=/${id}/booking`
                                : null
                        }
                        onClick={() => handleClickBtnTime(item)}
                        outline
                        size="s"
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

    const handleClickDateTag = (item = dateDefault, index) => {
        handleDateActive(index);
        setDoctorTime(item);
        dispatch(actions.setSelectedDateAction(item));
    };

    const getCurrentTimestampDate = () => {
        return moment(new Date()).startOf("day").valueOf();
    };

    const filterCurrentFutureDate = () => {
        const filter = scheduleById.filter(
            (item) => parseInt(item.date) >= getCurrentTimestampDate()
        );
        /// set ngay mac dinh
        dispatch(actions.setDateDefaultAction(filter[0]));
        return filter;
    };

    const renderNumOfTimeFrame = (timeType) => {
        return JSON.parse(timeType).length;
    };

    return (
        <div className={cx("schedule")}>
            {scheduleById &&
            scheduleById.length > 0 &&
            filterCurrentFutureDate().length > 0 ? (
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
                            {filterCurrentFutureDate().map((item, index) => {
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
            ) : (
                <div>
                    <FontAwesomeIcon
                        icon={faCalendarXmark}
                        className={cx("icon-no-schedule")}
                    />
                    Không có lịch khám nào !
                </div>
            )}
        </div>
    );
}

export default BookingSection;
