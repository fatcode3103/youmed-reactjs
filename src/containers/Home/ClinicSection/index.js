import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ClinicSection.module.scss";
import Image from "../../../components/Image";

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
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default ClinicSection;
