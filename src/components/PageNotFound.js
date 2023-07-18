import classNames from "classnames/bind";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./PageNotFound.module.scss";
import images from "../assets/image";
import { path } from "../utils/contants";

const cx = classNames.bind(styles);

const PageNotFound = () => (
    <div className={cx("not-found-container")}>
        <img
            src={images.notFound}
            alt="not-found"
            className={cx("not-found-img")}
        />
        <Link to={path.HOME}>Go Home</Link>
    </div>
);

export default PageNotFound;
