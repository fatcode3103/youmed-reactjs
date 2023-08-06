import classNames from "classnames/bind";

import styles from "./HomeHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/image";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function HomeHeader() {
    const { t } = useTranslation();

    return (
        <div className={cx("home-header-container")}>
            <div className={cx("home-header-content")}>
                <div className={cx("home-header-image row")}>
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
                <div className={cx("home-header-intro")}>
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
                <div className={cx("header-home-text")}>
                    <h2>Đặt lịch khám trực tuyến</h2>
                    <p>Tìm Bác sĩ chính xác - Đặt lịch khám dễ dàng</p>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
