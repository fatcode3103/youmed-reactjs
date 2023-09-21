import classNames from "classnames/bind";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./MenuBar.module.scss";
import { menuBar } from "../MenuData/menuData";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function MenuBar() {
    const location = useLocation();

    return (
        <div className={cx("menu-bar-container")}>
            <div className={cx("menu-bar-content")}>
                {menuBar &&
                    menuBar.length > 0 &&
                    menuBar.map((item, index) => {
                        const isActive = location.pathname === item.to;

                        return (
                            <NavLink
                                to={item.to}
                                key={index}
                                className={cx("menu-bar-item", {
                                    active: isActive,
                                })}
                            >
                                {item.title}
                            </NavLink>
                        );
                    })}
            </div>
        </div>
    );
}

export default MenuBar;
