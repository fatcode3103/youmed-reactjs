import { Link, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { path, language as LANGUAGE } from "../../utils/constant";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import styles from "./HeaderSystemDoctor.module.scss";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";
import BufferToBase64 from "../../utils/BufferToBase64";
import * as MenuData from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function HeaderSystemDoctor(props) {
    const { t } = useTranslation();

    const userState = useSelector((state) => state.user);

    const { currentUser, language } = userState;

    return (
        <div className={cx("header-container")}>
            <div className={cx("header-content")}>
                <Link to={path.HOME} className={cx("header-logo")}>
                    <img src={images.logo} alt="logo" />
                </Link>

                <div className={cx("header-text")}>
                    {MenuData.menuSystemDoctor.map((item, index) => {
                        return (
                            <Menu item={item} key={index}>
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
                    <Menu item={MenuData.menuDoctorInfo}>
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

export default HeaderSystemDoctor;
