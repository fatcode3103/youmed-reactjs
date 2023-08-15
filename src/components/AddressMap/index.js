import React from "react";
import Image from "../Image";
import classNames from "classnames/bind";

import styles from "./AddressMap.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const AddressMap = ({ src, nameAddress }) => {
    return (
        <div className={cx("map-container")}>
            <a
                href={src}
                target="_blank"
                rel="noreferrer"
                className={cx("map-content")}
            >
                <Image
                    className={cx("map-img")}
                    size="xl-no-stretch"
                    src="https://youmed.vn/dat-kham/assets/img/booking/map.webp"
                />
                <div className={cx("color-on-top")}></div>
                <div className={cx("info")}>
                    <div className={cx("info-title")}>Địa chỉ</div>
                    <div className={cx("info-address-text")}>{nameAddress}</div>
                    <div className={cx("info-btn")}>
                        <FontAwesomeIcon
                            icon={faBookOpen}
                            className={cx("icon")}
                        />
                        <p className={cx("info-btn-text")}>Mở bản đồ</p>
                    </div>
                </div>
            </a>
        </div>
    );
};
export default AddressMap;
