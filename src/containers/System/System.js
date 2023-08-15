import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./System.module.scss";
import { path } from "../../utils/constant";
import HeaderSystem from "../../components/Header/HeaderSystem";
import * as actions from "../../app/actions";
import BufferToBase64 from "../../utils/BufferToBase64";

const cx = classNames.bind(styles);

function System() {
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLogin, currentUser } = userState;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate(path.USER_MANAGE);
        }
    }, []);

    useEffect(() => {
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch]);

    return (
        <div>
            <HeaderSystem />
            <div className={cx("system-container")}></div>
        </div>
    );
}

export default System;
