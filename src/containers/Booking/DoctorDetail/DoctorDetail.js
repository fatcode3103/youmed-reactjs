import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import styles from "./DoctorDetail.module.scss";
import * as actions from "../../../app/actions";
import Image from "../../../components/Image";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import {
    faCircleCheck,
    faCircleExclamation,
    faCircleChevronDown,
    faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { language as LANGUAGE } from "../../../utils/constant";
import BufferToBase64 from "../../../utils/BufferToBase64";
import images from "../../../assets/image";
import Footer from "../../../components/Footer";
import DownloadAppSection from "../../Home/DownloadAppSection";
import AddressMap from "../../../components/AddressMap";
import MarkdownPreview from "../../../components/MarkdownPreview";
import BookingSection from "../../../components/BookingSection";

const cx = classNames.bind(styles);

function DoctorDetail() {
    const { t } = useTranslation();
    const [isShowSchedule, setIsShowSchedule] = useState(false);
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { doctorById, isLoading, language, dateDefault, doctorScheduleById } =
        user;
    const { detailInfoData } = doctorById;

    useEffect(() => {
        dispatch(actions.getDoctorByIdAction(id));
        dispatch(actions.getDoctorScheduleByIdAction(id));
    }, [dispatch]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    const handleRenderDoctorName = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const handleRenderDoctorPosition = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}`;
        } else {
            return `${doctor.positionData.valueEn}`;
        }
    };

    const handleRenderRole = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.roleData.valueVi}`;
        } else {
            return `${doctor.roleData.valueEn}`;
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

    const handleImageBase64 = (doctor) => {
        let imgBase64 = "";
        if (doctor.image) {
            imgBase64 = BufferToBase64(doctor.image.data);
        }
        return imgBase64;
    };

    const isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0;
    };

    const handleBtnBooking = () => {
        dispatch(actions.setScheduleTimeAction({}));
        dispatch(actions.setSelectedDateAction(dateDefault));
    };

    const renderSpecialtyByLanguage = (specialtyArr) => {
        if (specialtyArr && specialtyArr.length > 0) {
            let renderSpecialty = specialtyArr.map((item, index) => {
                return (
                    <p key={index} className={cx("specialty-item")}>
                        {language === LANGUAGE.VN ? item.valueVi : item.valueEn}
                    </p>
                );
            });
            return renderSpecialty;
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <div className={cx("detail-doctor-container")}>
                <Header />
                <div className={cx("detail-doctor-content")}>
                    <div className={cx("info-short")}>
                        <Image
                            src={
                                doctorById &&
                                !isObjectEmpty(doctorById) &&
                                handleImageBase64(doctorById)
                                    ? handleImageBase64(doctorById)
                                    : images.noImage
                            }
                            br="true"
                            size="l"
                            className={cx("img")}
                        />
                        <div className={cx("text")}>
                            <p className={cx("name")}>
                                {doctorById &&
                                    !isObjectEmpty(doctorById) &&
                                    doctorById.positionData &&
                                    handleRenderDoctorName(doctorById)}
                            </p>
                            <p className={cx("role")}>
                                <span className={cx("content-left")}>
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className={cx("icon-check")}
                                    />
                                    {doctorById &&
                                        !isObjectEmpty(doctorById) &&
                                        doctorById.roleData &&
                                        handleRenderRole(doctorById)}
                                </span>
                                <span className={cx("content-right")}>
                                    <span>
                                        {detailInfoData &&
                                        detailInfoData.yearExperience
                                            ? detailInfoData.yearExperience
                                            : 0}
                                    </span>
                                    <span>{t("doctor_detail.exp")}</span>
                                </span>
                            </p>
                            <p className={cx("specialty")}>
                                <span>{t("doctor_detail.specialty")}</span>
                                <span>
                                    {doctorById &&
                                        renderSpecialtyByLanguage(
                                            doctorById.specialtyData
                                        )}
                                </span>
                            </p>
                            <div className={cx("position")}>
                                <span>{t("doctor_detail.position")}</span>
                                <span>
                                    {doctorById &&
                                        !isObjectEmpty(doctorById) &&
                                        doctorById.positionData &&
                                        handleRenderDoctorPosition(doctorById)}
                                </span>
                            </div>
                            <div className={cx("hospital")}>
                                <span>{t("doctor_detail.work_place")}</span>
                                <div>
                                    {detailInfoData && detailInfoData.workPlace
                                        ? detailInfoData.workPlace
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("note-text")}>
                        {detailInfoData && detailInfoData.note ? (
                            <div className={cx("note")}>
                                <p>
                                    <FontAwesomeIcon
                                        icon={faCircleExclamation}
                                    />
                                    <span>{t("doctor_detail.note")}</span>
                                </p>
                                <MarkdownPreview
                                    className={cx("text-markdown")}
                                    markdown={detailInfoData.note}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={cx("schedule")}>
                        <div
                            className={cx("schedule-title")}
                            onClick={() => setIsShowSchedule(!isShowSchedule)}
                        >
                            <p className={cx("section-title")}>
                                {t("doctor_detail.booking")}
                            </p>
                            {isShowSchedule ? (
                                <FontAwesomeIcon
                                    icon={faCircleChevronUp}
                                    className={cx("icon-up")}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCircleChevronDown}
                                    className={cx("icon-down")}
                                />
                            )}
                        </div>
                        <div className={cx("schedule-content")}>
                            {!isShowSchedule && (
                                <BookingSection
                                    id={id}
                                    type="doctor"
                                    scheduleById={doctorScheduleById}
                                />
                            )}
                        </div>
                    </div>
                    <div className={cx("introduction")}>
                        <p className={cx("section-title")}>
                            {t("doctor_detail.intro")}
                        </p>
                        <div>
                            <span>
                                {doctorById &&
                                    !isObjectEmpty(doctorById) &&
                                    doctorById.positionData &&
                                    handleRenderDoctorName(doctorById)}
                            </span>
                            {detailInfoData && detailInfoData.introduction ? (
                                <MarkdownPreview
                                    className={cx("text-markdown")}
                                    markdown={detailInfoData.introduction}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={cx("address-map")}>
                        <p className={cx("section-title")}>
                            {t("doctor_detail.address")}
                        </p>
                        {detailInfoData &&
                        detailInfoData.address &&
                        detailInfoData.addressMap ? (
                            <AddressMap
                                nameAddress={detailInfoData.address}
                                src={detailInfoData.addressMap}
                                className={cx("address-map")}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className={cx("training")}>
                        <p className={cx("section-title")}>
                            {t("doctor_detail.training_process")}
                        </p>
                        <div>
                            {detailInfoData && detailInfoData.traningProcess ? (
                                <MarkdownPreview
                                    className={cx("text-markdown")}
                                    markdown={detailInfoData.traningProcess}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={cx("experience")}>
                        <p className={cx("section-title")}>
                            {t("doctor_detail.experience")}
                        </p>
                        <div>
                            {detailInfoData && detailInfoData.experience ? (
                                <MarkdownPreview
                                    className={cx("text-markdown")}
                                    markdown={detailInfoData.experience}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx("booking-now")}>
                    <a href="tel:19002805" target="_blank" rel="noreferrer">
                        {t("doctor_detail.support_appointmnet")}
                    </a>
                    <Button
                        onClick={() => handleBtnBooking()}
                        to={`/booking/doctor/${handleNameUrl(doctorById)}/${
                            doctorById.id
                        }/booking`}
                        normal
                        className={cx("btn-booking")}
                    >
                        {t("doctor_detail.booking_now")}
                    </Button>
                </div>
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default DoctorDetail;
