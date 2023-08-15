import classNames from "classnames/bind";

import styles from "./DownloadAppSection.module.scss";
import images from "../../../assets/image";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function DownloadAppSection() {
    const { t } = useTranslation();
    return (
        <div className={cx("download-app-container")}>
            <div className={cx("download-app-content")}>
                <div className={cx("content-left")}>
                    <h1>{t("home.download_app_section.title")}</h1>
                    <p>
                        {images.hospital}
                        <span>{t("home.download_app_section.schedule")}</span>
                    </p>
                    <p>
                        {images.like}
                        <span>
                            {t("home.download_app_section.consultation")}
                        </span>
                    </p>
                    <p>
                        {images.lock}
                        <span>{t("home.download_app_section.maintain")}</span>
                    </p>
                    <p>
                        {images.card}
                        <span>{t("home.download_app_section.payment")}</span>
                    </p>
                    <div className={cx("download-logo")}>
                        <a
                            href="https://apps.apple.com/gb/app/youmed/id1466077723"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {images.appleDownload}
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.youmed.info&pli=1"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {images.chplayDownload}
                        </a>
                    </div>
                </div>
                <div className={cx("content-right")}>
                    <img
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/app-download.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default DownloadAppSection;
