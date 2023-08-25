import { Link, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { path, language as LANGUAGE } from "../../utils/constant";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import styles from "./HeaderSystem.module.scss";
import { faCaretDown, faHome } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import Image from "../Image";
import BufferToBase64 from "../../utils/BufferToBase64";
import * as MenuData from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function HeaderSystem(props) {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    {MenuData.menuSystemAdmin.map((item, index) => {
                        return (
                            <Menu item={item}>
                                <NavLink>
                                    <span className={cx("text-manage")}>
                                        <span>
                                            {item[0].titleTop}{" "}
                                            <FontAwesomeIcon
                                                icon={faCaretDown}
                                            />
                                        </span>
                                    </span>
                                </NavLink>
                            </Menu>
                        );
                    })}
                </div>
                <div className={cx("header-account")}>
                    <Menu item={MenuData.menuUserInfo}>
                        <div className={cx("acconut-user")}>
                            <Image
                                br="true"
                                size="xs"
                                src={
                                    currentUser &&
                                    currentUser.image &&
                                    currentUser.image.data
                                        ? BufferToBase64(currentUser.image.data)
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
                </div>
            </div>
        </div>
    );
}

export default HeaderSystem;
