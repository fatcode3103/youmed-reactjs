import { Link, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { path, language as LANGUAGE } from "../../utils/constant";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import MenuUser from "../Menu/MenuUser";
import styles from "./HeaderSystem.module.scss";
import { faCaretDown, faHome } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";

const cx = classNames.bind(styles);

function HeaderSystem() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const menuUserManageSystem = [
        {
            title: t("system.doctor_manage"),
            key: "none",
            menuSub: {
                data: [
                    { title: "Thông tin", to: path.DOCTOR_MANAGE },
                    { title: "Lịch khám", to: path.DOCTOR_SCHEDULE },
                ],
            },
        },
    ];

    const userState = useSelector((state) => state.user);

    const { currentUser, language } = userState;

    const handlebackToHomeSystem = () => {
        navigate(path.SYSTEM);
    };

    return (
        <div className={cx("header-container")}>
            <div className={cx("header-content")}>
                <Link to={path.HOME} className={cx("header-logo")}>
                    <img src={images.logo} alt="logo" />
                </Link>
                <Tippy
                    render={(attrs) => (
                        <span
                            className={cx("home-tippy")}
                            tabIndex="-1"
                            {...attrs}
                        >
                            system home
                        </span>
                    )}
                >
                    <FontAwesomeIcon
                        icon={faHome}
                        className={cx("icon-home-system")}
                        onClick={() => handlebackToHomeSystem()}
                    />
                </Tippy>

                <div className={cx("header-text")}>
                    <Menu item={menuUserManageSystem}>
                        <NavLink
                            className={(state) =>
                                state.isActive ? cx("active") : ""
                            }
                            to={path.USER_MANAGE}
                        >
                            <span className={cx("text-manage")}>
                                <span>
                                    {t("system.user_manage")}{" "}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </span>
                        </NavLink>
                    </Menu>
                    <NavLink
                        className={(state) =>
                            state.isActive ? cx("active") : ""
                        }
                        to={path.SPECIALTY_MANAGE}
                    >
                        <span className={cx("text-manage")}>
                            <span>{t("system.specialty_manage")}</span>
                        </span>
                    </NavLink>
                </div>
                <div className={cx("header-account")}>
                    <Menu item={MenuUser()}>
                        <div className={cx("acconut-user")}>
                            <img
                                src={images.noImage}
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
                </div>
            </div>
        </div>
    );
}

export default HeaderSystem;
