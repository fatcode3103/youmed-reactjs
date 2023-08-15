import classNames from "classnames/bind";

import styles from "./AboutSection.module.scss";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function AboutSection() {
    const { t } = useTranslation();
    return (
        <div className={cx("about-container")}>
            <div className={cx("about-content")}>
                <div className={cx("content-left")}>
                    <div className={cx("title")}>
                        {t("home.about_section.title_1")}
                    </div>
                    <div>
                        <iframe
                            width="490"
                            height="275"
                            src="https://www.youtube.com/embed/MftRcZCHbwI"
                            title="04 BƯỚC ĐƠN GIẢN - ĐẶT KHÁM TIỆN LỢI - KHÔNG LO CHỜ ĐỢI"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ borderRadius: "10px" }}
                        ></iframe>
                    </div>
                </div>
                <div className={cx("content-right")}>
                    <div className={cx("title")}>
                        {t("home.about_section.title_2")}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutSection;
