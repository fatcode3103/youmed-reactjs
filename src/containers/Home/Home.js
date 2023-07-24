import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
import BufferToBase64 from "../../utils/BufferToBase64";
import HomeHeader from "./HomeHeader";
import DoctorSection from "./DoctorSection";
import HospitalSection from "./HospitalSection";
import ClinicSection from "./ClinicSection";
import SpecialtySection from "./SpecialtySection";
import MedicalSection from "./MedicalSection";
import Expert from "./Expert";
import AboutSection from "./AboutSection";
import DownloadAppSection from "./DownloadAppSection";
import Footer from "../../components/Footer";

const cx = classNames.bind(styles);

function Home() {
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
        <div className={cx("home-container")}>
            <Header avatarBase64={avatarBase64} />
            <div className={cx("home-content")}>
                <HomeHeader />
                <DoctorSection />
                <HospitalSection />
                <ClinicSection />
                <SpecialtySection />
                <MedicalSection />
                <Expert />
                <AboutSection />
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
