import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
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
    const { id } = useParams();

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

    const renderSpecialtyByLanguage = (specialtyArr) => {
        if (specialtyArr && specialtyArr.length > 0) {
            const renderedButtons = specialtyArr.map((item, index) => {
                return (
                    <Button to="/" key={index}>
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
                                        <span>Bảng giá dịch vụ</span>
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
                                        <span>Bảng giá hóa đơn</span>
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
                                Đặt khám
                            </Button>
                        </div>
                    </div>
                    <div className={cx("info", "row mt-5")}>
                        <div className={cx("introduction", "col-6 pe-4")}>
                            <p className={cx("introduction-title")}>
                                Giới thiệu
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
                                    Chuyên khoa
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
                                <p>Tổng đài hỗ trợ</p>
                                <span>
                                    Trong trường hợp bạn cần hỗ trợ thêm thông
                                    tin, vui lòng liên hệ tổng đài bên dưới để
                                    được trợ giúp.
                                </span>
                                <div className={cx("switchboard-link")}>
                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        Tổng đài đặt khám: 1900636223
                                    </Button>
                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faEarthAmerica}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        Hỗ trợ kỹ thuật: 19002805 (1.000đ/phút)
                                    </Button>

                                    <Button href="/">
                                        <FontAwesomeIcon
                                            icon={faHeadphones}
                                            className={cx(
                                                "switchboard-link-icon"
                                            )}
                                        />
                                        Tư vấn đặt khám
                                    </Button>
                                </div>
                            </div>
                            <div className={cx("schedule")}>
                                <p className={cx("schedule-title")}>
                                    Giờ làm việc
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
