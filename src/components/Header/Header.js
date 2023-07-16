import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useSelector, useDispatch } from "react-redux";

import { path } from "../../utils/contants";
import styles from "./Header.module.scss";
import logo from "../../assets/image/logo_youmed.svg";
import { PanelAppointment, PanelUserInfo } from "../Panel";

var _ = require("lodash");

const cx = classNames.bind(styles);

function Header() {
    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;

    const handleLoginBtn = () => {};

    return (
        <div className={cx("header-container")}>
            <div className={cx("header-content")}>
                <div className={cx("header-logo")}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={cx("header-text")}>
                    <Tippy
                        delay={[100, 100]}
                        interactive={true}
                        render={(attrs) => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                <PanelAppointment />
                            </div>
                        )}
                    >
                        <span className={cx("header-appointment")}>
                            <span>Đăt khám</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={cx("appointment-icon")}
                            />
                        </span>
                    </Tippy>

                    <span className={cx("header-advise")}>
                        Tư vấn trực tuyến
                    </span>
                    <span className={cx("header-store")}>Cửa hàng</span>
                    <span className={cx("header-medical")}>Tin y tế</span>
                    <Tippy
                        delay={[100, 100]}
                        interactive={true}
                        render={(attrs) => (
                            <div className="box" tabIndex="-1" {...attrs}>
                                {/* <PanelUserInfo /> */}
                            </div>
                        )}
                    >
                        <span className={cx("header-medical-staff")}>
                            <span>Dành cho nhân viên Y tế</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className={cx("medical-staff-icon")}
                            />
                        </span>
                    </Tippy>
                </div>
                <Tippy
                    delay={[100, 100]}
                    interactive={true}
                    render={(attrs) => (
                        <div className="box" tabIndex="-1" {...attrs}>
                            {isLogin ? <PanelUserInfo /> : ""}
                        </div>
                    )}
                >
                    <div className={cx("header-account")}>
                        {isLogin ? (
                            <>
                                <div>
                                    <span>
                                        {currentUser.firstName}{" "}
                                        {currentUser.lastName}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <Link
                                to={path.LOGIN}
                                onClick={() => handleLoginBtn()}
                                className={cx("btn-login")}
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Header;
