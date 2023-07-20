import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./PageLocked.module.scss";
import images from "../assets/image";
import { path } from "../utils/contants";

const cx = classNames.bind(styles);

const PageLoked = () => (
    <div className={cx("not-found-container")}>
        <img
            src={images.locked}
            alt="not-found"
            className={cx("not-found-img")}
        />
        <Link to={path.HOME} style={{ fontSize: "2rem" }}>
            Go Home
        </Link>
    </div>
);

export default PageLoked;
