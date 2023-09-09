import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./ClinicSection.module.scss";
import Image from "../../../components/Image";
import { useEffect } from "react";
import * as actions from "../../../app/actions";
import BufferToBase64 from "../../../utils/BufferToBase64";

const cx = classNames.bind(styles);

function ClinicSection() {
    const { t } = useTranslation();
    const slider = useRef(null);
    const settings = {
        swipeToSlide: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 9000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
    };

    const admin = useSelector((state) => state.admin);
    const { allClinic } = admin;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getAllClinicAction("5"));
    }, [dispatch]);

    return (
        <div className={cx("clinic-section-container")}>
            <div className={cx("clinic-section-content")}>
                <div className={cx("title")}>
                    <div className={cx("content-left")}>
                        <h4>{t("home.clinic_section.book_clinic")}</h4>
                        <p>{t("home.clinic_section.text")}</p>
                    </div>
                    <div className={cx("content-right")}>
                        <button className={cx("more-btn")}>
                            <span>{t("home.clinic_section.see_more")}</span>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className={cx("icon-arrow")}
                            />
                        </button>
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
                        {allClinic &&
                            allClinic.length > 0 &&
                            allClinic.map((item, index) => {
                                let imgBase64 = "";
                                if (item.logo) {
                                    imgBase64 = BufferToBase64(item.logo.data);
                                }
                                return (
                                    <NavLink
                                        className={cx("clinic-item")}
                                        key={index}
                                        to={`/booking/clinic-detail/${item.id}`}
                                    >
                                        <div className={cx("card")}>
                                            <Image
                                                src={imgBase64}
                                                size="s"
                                                className={cx("img")}
                                            />
                                            <h3>{item.name}</h3>
                                            <span>{item.address}</span>
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

export default ClinicSection;
