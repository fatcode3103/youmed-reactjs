import classNames from "classnames/bind";

import styles from "./Footer.module.scss";
import images from "../../assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTiktok,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function Footer({ backGround }) {
    const { t } = useTranslation();
    return (
        <div
            className={cx("login-footer")}
            style={{ backgroundColor: backGround }}
        >
            <div
                className={cx(
                    "row form-group flex-nowrap",
                    "login-footer-content"
                )}
            >
                <div className={cx("col-3")}>
                    <p className={cx("text-uppercase fw-bolder")}>
                        {t("home.footer_section.company.title")}
                    </p>
                    <p>{t("home.footer_section.company.text_1")}</p>
                    <p>{t("home.footer_section.company.text_2")}</p>
                    <p>{t("home.footer_section.company.text_3")}</p>
                    <p>{t("home.footer_section.company.text_4")}</p>
                </div>
                <div className={cx("col-3", "ms-5")}>
                    <p className={cx("text-capitalize fw-bolder ")}>
                        {t("home.footer_section.about_youmed.title")}
                    </p>
                    <p>{t("home.footer_section.about_youmed.text_1")}</p>
                    <p>{t("home.footer_section.about_youmed.text_2")}</p>
                    <p>{t("home.footer_section.about_youmed.text_3")}</p>
                    <p>{t("home.footer_section.about_youmed.text_4")}</p>
                </div>
                <div className={cx("col-3", "ps-50")}>
                    <p className={cx("text-capitalize fw-bolder")}>
                        {t("home.footer_section.service.title")}
                    </p>
                    <p>{t("home.footer_section.service.text_1")}</p>
                    <p>{t("home.footer_section.service.text_2")}</p>
                    <p>{t("home.footer_section.service.text_3")}</p>
                    <p>YouMed Store</p>
                    <p>Y360</p>
                    <p>YouMed Clinic</p>
                </div>
                <div className={cx("col-3")}>
                    <p className={cx("text-capitalize fw-bolder")}>
                        {t("home.footer_section.support.title")}
                    </p>
                    <p>{t("home.footer_section.support.text_1")}</p>
                    <p>{t("home.footer_section.support.text_2")}</p>
                    <p>{t("home.footer_section.support.text_3")}</p>
                    <p>{t("home.footer_section.support.text_4")}</p>
                    <p>{t("home.footer_section.support.text_5")}</p>
                </div>
            </div>
            <div className={cx("connection")}>
                <div className={cx("social")}>
                    <p>{t("home.footer_section.connect")}</p>
                    <div className={cx("social-icon")}>
                        <Button
                            target="_blank"
                            href="https://www.facebook.com/profile.php?id=100034110155872"
                        >
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className={cx("social-icon-1")}
                            />
                        </Button>
                        <FontAwesomeIcon
                            icon={faInstagram}
                            className={cx("social-icon-2")}
                        />
                        <FontAwesomeIcon
                            icon={faYoutube}
                            className={cx("social-icon-3")}
                        />
                        <FontAwesomeIcon
                            icon={faTiktok}
                            className={cx("social-icon-4")}
                        />
                    </div>
                </div>
                <div className={cx("license")}>
                    <Button
                        target="_blank"
                        href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=53817"
                    >
                        <img
                            src={images.btc}
                            alt=""
                            className={cx("license-1")}
                        />
                    </Button>
                    <Button
                        target="_blank"
                        href="https://www.dmca.com/Protection/Status.aspx?ID=a74b3497-ddcd-4860-89c3-fce83c39f12a&refurl=https://youmed.vn/dat-kham/login"
                    >
                        <img
                            src={images.dmca}
                            alt=""
                            className={cx("license-2")}
                        />
                    </Button>
                </div>
            </div>
            <hr
                style={{
                    height: "1px",
                    color: "#bbb",
                    width: "100%",
                    margin: "20px 0 20px 0",
                }}
            />
            <p className={cx("more-info")}>
                <span>{t("home.footer_section.info.text_1")}</span>
                <span>{t("home.footer_section.info.text_2")}</span>
                <span>{t("home.footer_section.info.text_3")}</span>
            </p>
        </div>
    );
}

export default Footer;
