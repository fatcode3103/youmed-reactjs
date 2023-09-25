import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SystemDoctor.module.scss";
import { path } from "../../utils/constant";
import HeaderSystemDoctor from "../../components/Header/HeaderSystemDoctor";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function SystemDoctor() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;

    useEffect(() => {
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch]);

    return (
        <div>
            <HeaderSystemDoctor />
            <div className={cx("system-container")}></div>
        </div>
    );
}

export default SystemDoctor;
