import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingHomeHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/image";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as actions from "../../../app/actions";
import { path } from "../../../utils/constant";
import SearchBar from "../../../components/SearchBar";

const cx = classNames.bind(styles);

function BookingHomeHeader() {
    const { t } = useTranslation();

    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { allHospital, allClinic } = admin;
    const { allDoctor } = user;

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllHospitalAction(""));
        dispatch(actions.getAllClinicAction(""));
    }, [dispatch]);

    return (
        <div className={cx("booking-home-header-container")}>
            <div className={cx("booking-home-header-content")}>
                <div className={cx("booking-home-header-image row")}>
                    <div
                        className={cx("content-left col-6 p-0")}
                        style={{ backgroundColor: "#1975dc" }}
                    ></div>
                    <img
                        src={images.headerImage}
                        alt=""
                        className={cx("col-6 p-0")}
                    />
                </div>
                <div className={cx("booking-home-header-intro")}>
                    <div className={cx("title")}>{t("home.header.title")}</div>
                    <div className={cx("text")}>{t("home.header.text")}</div>
                    <div className={cx("search")}>
                        <SearchBar autoDispatch={false} />
                    </div>
                </div>
                <div className={cx("footer")}>
                    <Link
                        to={path.DOCTOR_APPOINTMENT}
                        className={cx("footer-item")}
                    >
                        <p>{allDoctor.length}</p>
                        <p>{t("booking.doctor_present")}</p>
                    </Link>
                    <Link
                        to={path.HOSPITAL_APPOINTMENT}
                        className={cx("footer-item")}
                    >
                        <p>{allHospital.length}</p>
                        <p>{t("booking.connecting_hospital")}</p>
                    </Link>
                    <Link
                        to={path.CLINIC_APPOINTMENT}
                        className={cx("footer-item")}
                    >
                        <p>{allClinic.length}</p>
                        <p>{t("booking.polyclinic")}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookingHomeHeader;
