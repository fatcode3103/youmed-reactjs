import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import {
    faEarthAmerica,
    faHeadphones,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./HospitalDetail.module.scss";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer";
import HeaderContentDetail from "../../../components/HeaderContentDetail";
import Button from "../../../components/Button";
import Image from "../../../components/Image";
import Slider from "react-slick";
import * as actions from "../../../app/actions";
import MarkdownPreview from "../../../components/MarkdownPreview";
import { language as LANGUAGE } from "../../../utils/constant";
import Loading from "../../../components/Loading";
import SevenDaySchedule from "../../../components/SenvenDaySchedule";

var _ = require("lodash");

const cx = classNames.bind(styles);

function HospitalDetail() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [displayedIntro, setDisplayedIntro] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { hospitalById } = admin;
    const { language, isLoading, hospitalScheduleById } = user;
    const { hospitalDetailData } = hospitalById;

    const introduction =
        hospitalDetailData && hospitalDetailData.introduction
            ? hospitalDetailData.introduction
            : "";

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: false,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
    };

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getHospitalByIdAction(id));
        dispatch(actions.getHospitalScheduleByIdAction(id));
    }, [dispatch, id]);

    useEffect(() => {
        setDisplayedIntro(introduction.slice(0, 500));
    }, [introduction]);

    const handleCollapseText = (textSize) => {
        setDisplayedIntro(introduction.slice(0, textSize));
        setIsCollapsed(!isCollapsed);
    };

    const handleExpandText = () => {
        setDisplayedIntro(introduction);
        setIsCollapsed(!isCollapsed);
    };

    const buildDataSendToHeaderContentDetail = (dataInput) => {
        if (dataInput) {
            const { logo = "", name = "", hospitalDetailData } = dataInput;
            const {
                slogan = "",
                linkweb = "",
                addressMap = "",
                switchboard = "",
            } = hospitalDetailData;
            return {
                logo,
                name,
                slogan,
                linkweb,
                addressMap,
                switchboard,
            };
        }
    };

    const handleImagesArr = (imagesInput) => {
        let arr = [];
        arr = JSON.parse(imagesInput);
        return arr;
    };

    const handleClickSearchSpecialty = (specialtyId) => {
        dispatch(
            actions.postQuerySearchSpecialtyAction({
                specialtyId: specialtyId,
                type: "all",
                navigate,
            })
        );
    };

    const renderSpecialtyByLanguage = (specialtyArr) => {
        if (specialtyArr && specialtyArr.length > 0) {
            const renderedButtons = specialtyArr.map((item, index) => {
                return (
                    <Button
                        className={cx("btn-specialty-wrapper")}
                        onClick={() => handleClickSearchSpecialty(item.id)}
                        key={index}
                    >
                        <span className={cx("btn-specialty")}>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{
                                    marginRight: "6px",
                                }}
                            />
                            {language === LANGUAGE.VN
                                ? item.valueVi
                                : item.valueEn}
                        </span>
                    </Button>
                );
            });
            return renderedButtons;
        }
    };

    const handleNameUrl = (hospital) => {
        if (hospital && hospital.name) {
            const name = hospital.name;
            const nameUrl = name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/(\s+)/g, "-");
            return nameUrl;
        }
    };

    return (
        <div className={cx("hospital-detail-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("hospital-detail-content")}>
                {hospitalById &&
                    !_.isEmpty(hospitalById) &&
                    !_.isEmpty(hospitalById.hospitalDetailData) && (
                        <HeaderContentDetail
                            dataInput={buildDataSendToHeaderContentDetail(
                                hospitalById
                            )}
                        />
                    )}
                <hr style={{ color: "#aaa", margin: "40px 0px" }} />
                <div className={cx("body-content")}>
                    <div className={cx("slider-wrapper")}>
                        <Slider {...settings}>
                            {hospitalById &&
                                hospitalById.hospitalDetailData &&
                                hospitalById.hospitalDetailData.images &&
                                handleImagesArr(
                                    hospitalById.hospitalDetailData.images
                                ).map((item, index) => {
                                    return (
                                        <Image
                                            key={index}
                                            className={cx("img-hospital")}
                                            src={item}
                                            size="xl"
                                        />
                                    );
                                })}
                        </Slider>
                    </div>
                    <div className={cx("booking")}>
                        <div className={cx("price")}>
                            {hospitalById &&
                                hospitalById.hospitalDetailData &&
                                hospitalById.hospitalDetailData
                                    .servicePrice && (
                                    <Button
                                        target="_blank"
                                        rel="noreferrer"
                                        href={
                                            hospitalById.hospitalDetailData
                                                .servicePrice
                                        }
                                        className={cx("price-1")}
                                    >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            {t("hospital_detail.price_service")}
                                        </span>
                                    </Button>
                                )}
                            {hospitalById &&
                                hospitalById.hospitalDetailData &&
                                hospitalById.hospitalDetailData.billPrice && (
                                    <Button
                                        target="_blank"
                                        rel="noreferrer"
                                        href={
                                            hospitalById.hospitalDetailData
                                                .billPrice
                                        }
                                        className={cx("price-2")}
                                    >
                                        <FontAwesomeIcon icon={faFileLines} />
                                        <span>
                                            {t("hospital_detail.price_bill")}
                                        </span>
                                    </Button>
                                )}
                        </div>
                        <div>
                            <Button
                                to={`/booking/hospital/${handleNameUrl(
                                    hospitalById
                                )}/${id}/booking`}
                                normal="true"
                                className={cx("btn-booking")}
                            >
                                {t("hospital_detail.booking")}
                            </Button>
                        </div>
                    </div>
                    <div className={cx("info", "row mt-5")}>
                        <div className={cx("introduction", "col-6 pe-4")}>
                            <p className={cx("introduction-title")}>
                                {t("hospital_detail.intro")}
                            </p>
                            <div>
                                <MarkdownPreview
                                    markdown={displayedIntro}
                                    className={cx("intro-markdown")}
                                />
                                <span
                                    onClick={() =>
                                        isCollapsed
                                            ? handleCollapseText(500)
                                            : handleExpandText()
                                    }
                                    style={{
                                        color: "#1975dc",
                                        cursor: "pointer",
                                    }}
                                >
                                    {isCollapsed ? "Thu gọn" : "...Xem thêm"}
                                </span>
                            </div>
                            <div className={cx("specialty")}>
                                <p className={cx("specialty-title")}>
                                    {t("hospital_detail.specialty")}
                                </p>
                                <div>
                                    {hospitalById &&
                                        renderSpecialtyByLanguage(
                                            hospitalById.specialtyData
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className={cx("col-6 ps-4")}>
                            <div className={cx("switchboard-support")}>
                                <p>
                                    {t("hospital_detail.support_switchboard_1")}
                                </p>
                                <span>
                                    {t("hospital_detail.support_switchboard_2")}
                                </span>
                                <div className={cx("switchboard-link")}>
                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        {t(
                                            "hospital_detail.call_medical_examination"
                                        )}
                                        : 1900636223
                                    </Button>
                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faEarthAmerica}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        {t("hospital_detail.technical")}:
                                        19002805 (1.000đ/phút)
                                    </Button>

                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faHeadphones}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        {t("hospital_detail.consultation")}
                                    </Button>
                                </div>
                            </div>
                            <div className={cx("schedule")}>
                                <p className={cx("schedule-title")}>
                                    {t("hospital_detail.work_time")}
                                </p>
                                <SevenDaySchedule
                                    startDate={1}
                                    dataScheduleFromDb={hospitalScheduleById}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ color: "#aaa", margin: "40px 0px" }} />
            <Footer />
        </div>
    );
}

export default HospitalDetail;
