import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { path } from "../../utils/contants";
import Menu from "../Menu/Menu";
import images from "../../assets/image";
import MenuUser from "../Menu/MenuUser";
import styles from "./HeaderSystem.module.scss";

const cx = classNames.bind(styles);

function HeaderSystem() {
    const navigate = useNavigate();

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;

    const handlebackToHomeSystem = () => {
        navigate(path.SYSTEM);
    };

    return (
        <div className={cx("header-container")}>
            <div className={cx("header-content")}>
                <div
                    className={cx("header-logo")}
                    onClick={() => handlebackToHomeSystem()}
                >
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx("header-text")}>
                    <Link to={path.USER_MANAGE}>
                        <span className={cx("user-manage")}>
                            <span>Quản lý người dùng</span>
                        </span>
                    </Link>
                </div>
                <div className={cx("header-account")}>
                    <Menu item={MenuUser()}>
                        <div className={cx("acconut-user")}>
                            <img
                                src={images.noImage}
                                alt="avatar"
                                className={cx("img-account")}
                            />
                            <span>
                                {currentUser.firstName} {currentUser.lastName}
                            </span>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default HeaderSystem;
