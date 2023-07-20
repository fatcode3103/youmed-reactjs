import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { path, language } from "../../utils/contants";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import Button from "../Button";
// import MenuAppointment from "../Menu/MenuAppointment";
// import MenuStaff from "../Menu/MenuStaff";
// import MenuUser from "../Menu/MenuUser";

import {
    menuAppointment,
    menuMedicalStaff,
    menuUserInfo,
} from "../MenuData/menuData";

const cx = classNames.bind(styles);

function Header(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;

    const menuLanguage = [
        {
            title: "English",
            code: language.EN,
            key: "none",
        },
        {
            title: "Vietnamese",
            code: language.VN,
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
                                        src={images.noImage}
                                        alt="avatar"
                                        className={cx("img-account")}
                                    />
                                    <span>
                                        {currentUser.firstName}{" "}
                                        {currentUser.lastName}
                                    </span>
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
