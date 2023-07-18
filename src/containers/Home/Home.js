import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./Home.module.scss";
import Header from "../../components/Header";
import HomeHeader from "./HomeHeader";

const cx = classNames.bind(styles);

function Home() {
    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin } = userState;

    return (
        <div className={cx("home-container")}>
            <Header />
            <div className={cx("home-content")}>
                <HomeHeader />
            </div>
        </div>
    );
}

export default Home;
