import classNames from "classnames/bind";

import styles from "./BookingHomeHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/image";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function BookingHomeHeader() {
    const { t } = useTranslation();

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
                        <input
                            type="text"
                            placeholder={t("home.header.search")}
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className={cx("icon-search")}
                        />
                    </div>
                </div>
                <div className={cx("footer")}>
                    <Link to="/" className={cx("footer-item")}>
                        <p>20+</p>
                        <p>{t("booking.connecting_hospital")}</p>
                    </Link>
                    <Link className={cx("footer-item")}>
                        <p>20+</p>
                        <p>{t("booking.doctor_present")}</p>
                    </Link>
                    <Link className={cx("footer-item")}>
                        <p>20+</p>
                        <p>{t("booking.polyclinic")}</p>
                    </Link>
                    <Link className={cx("footer-item")}>
                        <p>20+</p>
                        <p>{t("booking.specialty")}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookingHomeHeader;
