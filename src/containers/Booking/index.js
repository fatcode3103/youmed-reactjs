import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./Booking.module.scss";
import Header from "../../components/Header";
import BookingHomeHeader from "./BookingHomeHeader/BookingHomeHeader";
import BufferToBase64 from "../../utils/BufferToBase64";
import DoctorSection from "../../containers/Home/DoctorSection";
import HospitalSection from "../../containers/Home/HospitalSection";
import ClinicSection from "../../containers/Home/ClinicSection";
import SpecialtySection from "../../containers/Home/SpecialtySection";
import AboutSection from "../../containers/Home/AboutSection";
import DownloadAppSection from "../../containers/Home/DownloadAppSection";
import Footer from "../../components/Footer";

const cx = classNames.bind(styles);

function Booking() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [avatarBase64, setAvatarBase64] = useState("");

    const { currentUser } = userState;

    useEffect(() => {
        if (currentUser.image) {
            setAvatarBase64(BufferToBase64(currentUser.image.data));
        }
    }, []);

    return (
        <div className={cx("booking-container")}>
            <Header avatarBase64={avatarBase64} />
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
