import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
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
import Loading from "../../components/Loading";

const cx = classNames.bind(styles);

function Home() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { currentUser, isLoading } = userState;

    useEffect(() => {
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className={cx("home-container")}>
            <Header />
            {isLoading && <Loading />}
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
