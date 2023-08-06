import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./System.module.scss";
import { path } from "../../utils/constant";
import HeaderSystem from "../../components/Header/HeaderSystem";

const cx = classNames.bind(styles);

function System() {
    const userState = useSelector((state) => state.user);

    const { isLogin } = userState;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate(path.USER_MANAGE);
        }
    }, []);

    return (
        <div>
            <HeaderSystem />
            <div className={cx("system-container")}></div>
        </div>
    );
}

export default System;
