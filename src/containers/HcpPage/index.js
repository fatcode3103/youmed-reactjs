import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./HcpPage.module.scss";
import Header from "../../components/Header";
import images from "../../assets/image";
import Image from "../../components/Image";
import Button from "../../components/Button";
import * as actions from "../../app/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHospital,
    faHouseChimneyMedical,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import {
    dataStepScheduleHcp,
    dataServiceHcp,
} from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function HcpPage() {
    const { t } = useTranslation();
    const [stepScheduleActive, setstepScheduleActive] = useState(0);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading, allDoctor } = user;
    const { allHospital, allClinic } = admin;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setstepScheduleActive(
                (prevStep) => (prevStep + 1) % dataStepScheduleHcp.length
            );
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllHospitalAction(""));
        dispatch(actions.getAllClinicAction(""));
    }, [dispatch]);

    const renderStepSchedule = () => {
        return dataStepScheduleHcp.map((item, index) => {
            return (
                <div
                    key={index}
                    className={cx("schedule-manage-content-item")}
                    onClick={() => setstepScheduleActive(index)}
                >
                    <p
                        className={cx({
                            active: index === stepScheduleActive,
                        })}
                    >
                        {item.title}
                    </p>
                    <span>{item.description}</span>
                </div>
            );
        });
    };

    const renderScheduleImageActive = () => {
        return <Image src={dataStepScheduleHcp[stepScheduleActive].image} />;
    };

    return (
        <div className={cx("hcp-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("hcp-content")}>
                <div className={cx("hcp-content-header-wrapper")}>
                    <div className={cx("hcp-content-header", "row")}>
                        <div className={cx("col-7")}>
                            <div className={cx("hcp-content-header-title-1")}>
                                YouMed HCP
                            </div>
                            <div className={cx("hcp-content-header-title-2")}>
                                {t("hcp.solutions_1")}
                            </div>
                            <p>{t("hcp.solutions_2")}</p>
                            <Button href="#cooperation" normal="true">
                                {t("hcp.cooperation")}
                            </Button>
                        </div>
                        <div className={cx("col-5")}>
                            <Image src={images.hcpBanner} />
                        </div>
                    </div>
                </div>

                <div className={cx("hcp-service", "row flex-nowrap")}>
                    {dataServiceHcp.map((item, index) => {
                        return (
                            <a
                                href={item.redirect}
                                key={index}
                                className={cx("hcp-service-item", "col-4 mx-2")}
                            >
                                <Image
                                    className={cx("hcp-service-item-image")}
                                    src={item.image}
                                />
                                <p
                                    className={cx(
                                        "hcp-service-item-description"
                                    )}
                                >
                                    {item.description}
                                </p>
                                <p className={cx("hcp-service-item-title")}>
                                    {item.title}
                                </p>
                            </a>
                        );
                    })}
                </div>

                <div className={cx("schedule-manage")} id="schedule-manage">
                    <div className={cx("schedule-manage-title")}>
                        {t("hcp.app_schedule_manage")}
                    </div>
                    <div className={cx("schedule-manage-content", "row")}>
                        <div className={cx("col-6 px-0")}>
                            {renderScheduleImageActive()}
                        </div>
                        <div className={cx("col-6 px-0")}>
                            {renderStepSchedule()}
                        </div>
                    </div>
                </div>

                <div className={cx("advise-online", "row")} id="advise-online">
                    <div className={cx("col-6")}>
                        <div className={cx("advise-online-title")}>
                            {t("hcp.consulting_platform")}
                        </div>
                        <ul>
                            <li>{t("hcp.consulting_platform_1")}</li>
                            <li>{t("hcp.consulting_platform_2")}</li>
                            <li>{t("hcp.consulting_platform_3")}</li>
                            <li>{t("hcp.consulting_platform_4")}</li>
                            <li>{t("hcp.consulting_platform_5")}</li>
                        </ul>
                        <Button href="#cooperation" outline="true">
                            {t("hcp.register_now")}
                        </Button>
                    </div>
                    <div className={cx("col-6", "advise-online-image")}>
                        <Image src={images.adviseOnlineSection} />
                    </div>
                </div>

                <div className={cx("connect-doctor-wrapper")}>
                    <div className={cx("connect-doctor-content", "row")}>
                        <div className={cx("connect-doctor-image", "col-6")}>
                            <Image src={images.connectDoctor} />
                        </div>
                        <div className={cx("connect-doctor-text", "col-6")}>
                            <div className={cx("connect-doctor-text-title")}>
                                {t("hcp.connect_doctor")}
                            </div>
                            <div className={cx("connect-doctor-icon-wrapper")}>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faUserDoctor}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allDoctor.length}</span>
                                    <span>{t("hcp.doctor")}</span>
                                </div>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faHouseChimneyMedical}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allClinic.length}</span>
                                    <span>{t("hcp.clinic")}</span>
                                </div>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faHospital}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allHospital.length}</span>
                                    <span>{t("hcp.hospital")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("clinic-manage", "row")} id="clinic-manage">
                    <div className={cx("col-5")}>
                        <Image src={images.clinicManage} />
                    </div>
                    <div className={cx("clinic-manage-content", "col-7")}>
                        <div className={cx("clinic-manage-content-title")}>
                            {t("hcp.clinic_manage")}
                        </div>
                        <ul>
                            <li>{t("hcp.clinic_manage_1")}</li>
                            <li>{t("hcp.clinic_manage_2")}</li>
                            <li>{t("hcp.clinic_manage_3")}</li>
                            <li>{t("hcp.clinic_manage_4")}</li>
                            <li>{t("hcp.clinic_manage_5")}</li>
                        </ul>
                        <Button href="#cooperation" outline="true">
                            {t("hcp.register_now")}
                        </Button>
                    </div>
                </div>

                <div className={cx("cooperation", "row")} id="cooperation">
                    <div className={cx("cooperation-text", "col-6")}>
                        <div className={cx("cooperation-text-title-1")}>
                            {t("hcp.partner")}
                        </div>
                        <p className={cx("cooperation-text-title-2")}>
                            {t("hcp.contact_you")}
                        </p>
                        <div className={cx("cooperation-text-form", "col-9")}>
                            <input
                                type="text"
                                className={cx("form-control mb-3")}
                                placeholder="Họ và tên*"
                            />
                            <input
                                type="text"
                                className={cx("form-control mb-3")}
                                placeholder="Số điện thoại*"
                            />
                            <input
                                type="email"
                                className={cx("form-control mb-3")}
                                placeholder="Địa chỉ email*"
                            />
                            <Button normal="true">{t("hcp.send")}</Button>
                        </div>
                    </div>
                    <div className={cx("col-6")}>
                        <Image src={images.cooperation} />
                    </div>
                </div>
            </div>
            <Footer backGround="#f9fafb" />
        </div>
    );
}

export default HcpPage;
