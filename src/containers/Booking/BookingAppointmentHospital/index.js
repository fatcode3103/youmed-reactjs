import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./BookingAppointmentHospital.module.scss";
import BookingAppoimentPage from "../../../components/BookingAppointmentPage";
import BookingSection from "../../../components/BookingSection";
import PatientProfile from "../../../components/PatientProfileBooking";
import Loading from "../../../components/Loading";
import Header from "../../../components/Header/Header";
import moment from "moment";
import { language as LANGUAGE, date } from "../../../utils/constant";
import { useEffect } from "react";
import * as actions from "../../../app/actions";
import BufferToBase64 from "../../../utils/BufferToBase64";
import { distinguishSubjectExamination } from "../../../utils/constant";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingAppointmentHospital() {
    const { t } = useTranslation();
    let { id } = useParams();

    const user = useSelector((state) => state.user);
    const {
        isLoading,
        language,
        selectedDate,
        selectedScheduleTime,
        hospitalScheduleById,
    } = user;
    const admin = useSelector((state) => state.admin);
    const { userById, hospitalById } = admin;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getHospitalByIdAction(id));
        dispatch(actions.getHospitalScheduleByIdAction(id));
    }, [dispatch, id]);

    const renderSelectedDate = (dateObj) => {
        let res;
        if (!_.isEmpty(dateObj)) {
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
        }
    };

    const renderSelectedTime = (timeObj) => {
        if (!_.isEmpty(timeObj)) {
            if (language === LANGUAGE.VN) {
                return timeObj.valueVi;
            } else {
                return timeObj.valueEn;
            }
        }
    };

    const renderNamePatient = (user) => {
        if (!_.isEmpty(user)) {
            if (language === LANGUAGE.VN) {
                return `${user.lastName} ${user.firstName}`;
            } else {
                return `${user.firstName} ${user.lastName}`;
            }
        }
    };

    const renderSpecialty = (hospital) => {
        if (hospital.specialtyData && hospital.specialtyData.length > 0) {
            let arr = hospital.specialtyData.map((item) => {
                return language === LANGUAGE.VN ? item.valueVi : item.valueEn;
            });
            return arr.join(", ");
        }
    };

    const handleImageBase64 = (image) => {
        if (image.logo && image.logo.data) {
            return BufferToBase64(image.logo.data);
        }
    };

    const sectionStepData = [
        {
            title: t("booking.date_and_time"),
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
            title: t("booking.patient"),
            component: PatientProfile,
            data: [
                {
                    value: renderNamePatient(userById),
                },
            ],
        },
    ];

    return (
        <div>
            {isLoading && <Loading />}
            <Header />
            {hospitalById && (
                <BookingAppoimentPage
                    id={33}
                    sectionStepData={sectionStepData}
                    scheduleById={hospitalScheduleById}
                    avatarBookingBase64={handleImageBase64(hospitalById)}
                    specialty={renderSpecialty(hospitalById)}
                    nameBooking={hospitalById.name ? hospitalById.name : ""}
                    addressBooking={
                        hospitalById.address ? hospitalById.address : ""
                    }
                    dynamicEntity={hospitalById ? hospitalById : {}}
                    distinguishSubjectExamination={
                        distinguishSubjectExamination.HOSPITAL
                    }
                    renderSelectedTime={renderSelectedTime}
                    renderSelectedDate={renderSelectedDate}
                />
            )}
        </div>
    );
}

export default BookingAppointmentHospital;
