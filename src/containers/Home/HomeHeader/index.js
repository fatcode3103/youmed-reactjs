import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

import styles from "./HomeHeader.module.scss";
import images from "../../../assets/image";
import SearchBar from "../../../components/SearchBar";

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
                    <SearchBar autoDispatch={false} />
                </div>
                <div className={cx("header-home-text")}>
                    <h2>{t("home.header.booking_online")}</h2>
                    <p>{t("home.header.find_doctor")}</p>
                </div>
            </div>
        </div>
    );
}

export default HomeHeader;
