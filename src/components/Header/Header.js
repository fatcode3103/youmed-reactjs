import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { path, language as LANGUAGE } from "../../utils/constant";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import Button from "../Button";
import BufferToBase64 from "../../utils/BufferToBase64";

import {
    menuAppointment,
    menuMedicalStaff,
    menuUserInfo,
    menuHeader,
} from "../MenuData/menuData";
import Image from "../Image";

const cx = classNames.bind(styles);

function Header(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const userState = useSelector((state) => state.user);
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

                <div className={cx("header-navbar")}>
                    <div className={cx("header-text")}>
                        {menuHeader.map((item, index) => {
                            return item[0].isMenu ? (
                                <Menu item={item} key={index}>
                                    <NavLink>
                                        <span
                                            className={cx("header-text-item")}
                                        >
                                            <span>
                                                {item[0].titleTop}{" "}
                                                <FontAwesomeIcon
                                                    icon={faCaretDown}
                                                    className={cx("drop-icon")}
                                                />
                                            </span>
                                        </span>
                                    </NavLink>
                                </Menu>
                            ) : (
                                <NavLink
                                    key={index}
                                    to={item[0].to}
                                    className={cx("header-text-item")}
                                >
                                    {item[0].title}
                                </NavLink>
                            );
                        })}
                    </div>
                    <div className={cx("header-account")}>
                        {isLogin ? (
                            <>
                                <Menu item={menuUserInfo}>
                                    <div className={cx("acconut-user")}>
                                        <Image
                                            br="true"
                                            size="xs"
                                            src={
                                                currentUser &&
                                                currentUser.image &&
                                                currentUser.image.data
                                                    ? BufferToBase64(
                                                          currentUser.image.data
                                                      )
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
                                <Button to={path.LOGIN} outline="true" size="s">
                                    {t("home.login")}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
