import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import styles from "./HospitalSection.module.scss";
import Image from "../../../components/Image";
import { useEffect } from "react";
import * as actions from "../../../app/actions";
import BufferToBase64 from "../../../utils/BufferToBase64";
import { NavLink } from "react-router-dom";
import Button from "../../../components/Button";
import { path } from "../../../utils/constant";

const cx = classNames.bind(styles);

function HospitalSection() {
    const { t } = useTranslation();
    const slider = useRef(null);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { allHospital } = admin;

    useEffect(() => {
        dispatch(actions.getAllHospitalAction("6"));
    }, [dispatch]);

    const settings = {
        swipeToSlide: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
    };

    return (
        <div className={cx("hospital-section-container")}>
            <div className={cx("hospital-section-content")}>
                <div className={cx("title")}>
                    <div className={cx("content-left")}>
                        <h4>{t("home.hospital_section.book_hospital")}</h4>
                        <p>{t("home.hospital_section.payment")}</p>
                    </div>
                    <div className={cx("content-right")}>
                        <Button
                            to={path.HOSPITAL_APPOINTMENT}
                            className={cx("more-btn")}
                        >
                            <span>{t("home.hospital_section.see_more")}</span>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className={cx("icon-arrow")}
                            />
                        </Button>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("btn-slider")}>
                        <button
                            className={cx("btn-prev")}
                            onClick={() => slider.current.slickPrev()}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button
                            className={cx("btn-next")}
                            onClick={() => slider.current.slickNext()}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                    <Slider {...settings} ref={slider}>
                        {allHospital &&
                            allHospital.length > 0 &&
                            allHospital.map((item, index) => {
                                let logo = "",
                                    coverImg = "";
                                if (item.logo || item.coverImg) {
                                    logo = BufferToBase64(item.logo.data);
                                    coverImg = BufferToBase64(
                                        item.coverImg.data
                                    );
                                }
                                return (
                                    <NavLink
                                        to={`/booking/hospital-detail/${item.id}`}
                                        className={cx("hospital-item")}
                                        key={index}
                                    >
                                        <div className={cx("card")}>
                                            <Image
                                                src={coverImg}
                                                className={cx("img-below")}
                                            />
                                            <Image
                                                src={logo}
                                                size="m"
                                                className={cx("img-above")}
                                            />
                                            <div className={cx("info")}>
                                                <div
                                                    className={cx(
                                                        "short-intro"
                                                    )}
                                                >
                                                    <h3>{item.name}</h3>
                                                    <span>{item.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HospitalSection;
