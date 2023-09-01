import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./Booking.module.scss";
import Header from "../../components/Header";
import BookingHomeHeader from "./BookingHomeHeader/BookingHomeHeader";
import DoctorSection from "../../containers/Home/DoctorSection";
import HospitalSection from "../../containers/Home/HospitalSection";
import ClinicSection from "../../containers/Home/ClinicSection";
import SpecialtySection from "../../containers/Home/SpecialtySection";
import AboutSection from "../../containers/Home/AboutSection";
import DownloadAppSection from "../../containers/Home/DownloadAppSection";
import Footer from "../../components/Footer";

const cx = classNames.bind(styles);

function Booking() {
    // const userState = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    return (
        <div className={cx("booking-container")}>
            <Header />
            <div className={cx("booking-content")}>
                <BookingHomeHeader />
                <DoctorSection />
                <HospitalSection />
                <ClinicSection />
                <SpecialtySection />
                <AboutSection />
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default Booking;
