import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { path } from "../../utils/contants";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import Button from "../Button";
import * as menuData from "../MenuData";

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;

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
                    <Menu item={menuData.menuAppointment}>
                        <span className={cx("header-appointment")}>
                            <span>Đặt khám</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={cx("appointment-icon")}
                            />
                        </span>
                    </Menu>

                    <span className={cx("header-advise")}>
                        Tư vấn trực tuyến
                    </span>
                    <span className={cx("header-store")}>Cửa hàng</span>
                    <span className={cx("header-medical")}>Tin y tế</span>
                    <Menu item={menuData.menuMedicalStaff}>
                        <span className={cx("header-medical-staff")}>
                            <span>Dành cho nhân viên Y tế</span>
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
                            <Menu item={menuData.menuUserInfo}>
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
                        <Button to={path.LOGIN} outline={true} size="s">
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
