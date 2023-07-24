import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { path, language as LANGUAGE } from "../../utils/contants";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import Button from "../Button";

import {
    menuAppointment,
    menuMedicalStaff,
    menuUserInfo,
} from "../MenuData/menuData";

const cx = classNames.bind(styles);

function Header(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { avatarBase64 } = props;
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLogin, currentUser, language } = userState;

    const menuLanguage = [
        {
            title: "English",
            code: LANGUAGE.EN,
            key: "none",
        },
        {
            title: "Vietnamese",
            code: LANGUAGE.VN,
            key: "none",
        },
    ];

    const handlebackToHome = () => {
        navigate(path.HOME);
    };

    return (
        <div className={cx("header-container")}>
            <div className={cx("header-content")}>
                <div
                    className={cx("header-logo")}
                    onClick={() => handlebackToHome()}
                >
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx("header-text")}>
                    <Menu item={menuAppointment}>
                        <span className={cx("header-appointment")}>
                            <span>{t("home.appointment")}</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={cx("appointment-icon")}
                            />
                        </span>
                    </Menu>

                    <span className={cx("header-advise")}>
                        {t("home.counseling")}
                    </span>
                    <span className={cx("header-store")}>
                        {t("home.store")}
                    </span>
                    <span className={cx("header-medical")}>
                        {t("home.medical_news")}
                    </span>
                    <Menu item={menuMedicalStaff}>
                        <span className={cx("header-medical-staff")}>
                            <span>{t("home.medical_staff")}</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={cx("medical-staff-icon")}
                            />
                        </span>
                    </Menu>
                </div>
                <div className={cx("header-account")}>
                    {isLogin ? (
                        <>
                            <Menu item={menuUserInfo}>
                                <div className={cx("acconut-user")}>
                                    <img
                                        src={
                                            avatarBase64
                                                ? avatarBase64
                                                : images.noImage
                                        }
                                        alt="avatar"
                                        className={cx("img-account")}
                                    />
                                    {language === LANGUAGE.VN ? (
                                        <span>
                                            {currentUser.lastName}{" "}
                                            {currentUser.firstName}
                                        </span>
                                    ) : (
                                        <span>
                                            {currentUser.firstName}{" "}
                                            {currentUser.lastName}
                                        </span>
                                    )}
                                </div>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Menu item={menuLanguage}>
                                <FontAwesomeIcon
                                    icon={faLanguage}
                                    className={cx("header-language")}
                                />
                            </Menu>
                            <Button to={path.LOGIN} outline={true} size="s">
                                {t("home.login")}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
