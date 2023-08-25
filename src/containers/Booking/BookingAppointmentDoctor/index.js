import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

import styles from "./BookingAppointmentDoctor.module.scss";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading";
import Footer from "../../../components/Footer";
import DownloadAppSection from "../../Home/DownloadAppSection";
import * as actions from "../../../app/actions";
import BookingAppoimentPage from "../../../components/BookingAppointmentPage";
import BookingSection from "../../../components/BookingSection";
import PatientProfile from "../../../components/PatientProfileBooking";
import { language as LANGUAGE, date } from "../../../utils/constant";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppointment() {
    let { id } = useParams();

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const { userById } = admin;
    const {
        doctorById,
        language,
        selectedDate,
        selectedScheduleTime,
        isLoading,
        currentUser,
    } = user;
    const dispatch = useDispatch();

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
        if (res) {
            return res[0].toUpperCase() + res.slice(1);
        }
        return "";
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

    const sectionStepData = [
        {
            title: "Ngày và giờ khám",
            component: BookingSection,
            data: [
                {
                    value: renderSelectedDate(selectedDate),
                },
                {
                    value: renderSelectedTime(selectedScheduleTime),
                },
            ],
        },
        {
            title: "Bệnh nhân",
            component: PatientProfile,
            data: [
                {
                    value: renderNamePatient(userById),
                },
            ],
        },
    ];

    useEffect(() => {
        dispatch(actions.getDoctorByIdAction(id));
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div>
            {isLoading && <Loading />}
            <div className={cx("booking-appointment-container")}>
                <Header />
                <BookingAppoimentPage
                    id={id}
                    sectionStepData={sectionStepData}
                    infoById={doctorById}
                    renderSelectedDate={renderSelectedDate}
                    renderSelectedTime={renderSelectedTime}
                    renderNamePatient={renderNamePatient}
                />
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default BookingAppointment;
