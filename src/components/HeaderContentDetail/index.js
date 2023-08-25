import classNames from "classnames/bind";

import styles from "./HeaderContentDetail.module.scss";
import Image from "../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEarthAmerica,
    faHeart,
    faMapLocation,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Button from "../../components/Button";
import BufferToBase64 from "../../utils/BufferToBase64";

const cx = classNames.bind(styles);

function HeaderContentDetail(props) {
    const { dataInput } = props;
    const [isHeartActive, setIsHeartActive] = useState(false);

    const handleClickFavourite = () => {
        setIsHeartActive(!isHeartActive);
    };

    return (
        <div className={cx("header-content")}>
            <div className={cx("content-left")}>
                <Image
                    className={cx("logo-hospital")}
                    src={
                        dataInput && dataInput.logo && dataInput.logo.data
                            ? BufferToBase64(dataInput.logo.data)
                            : null
                    }
                    size="m"
                    br10
                />
                <div className={cx("hospital-info")}>
                    <div className={cx("hospital-info-title")}>
                        {dataInput && dataInput.name ? dataInput.name : ""}
                    </div>
                    <div className={cx("hospital-info-slogan")}>
                        {dataInput && dataInput.slogan ? dataInput.slogan : ""}
                    </div>
                    <div className={cx("hospital-info-contact")}>
                        <Button
                            href={
                                dataInput && dataInput.linkweb
                                    ? dataInput.linkweb
                                    : ""
                            }
                            blur="true"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon
                                className={cx("icon-contact")}
                                icon={faEarthAmerica}
                            />
                            <span>Website</span>
                        </Button>
                        <Button
                            href={
                                dataInput && dataInput.addressMap
                                    ? dataInput.addressMap
                                    : ""
                            }
                            blur="true"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon
                                className={cx("icon-contact")}
                                icon={faMapLocation}
                            />
                            <span>Địa chỉ</span>
                        </Button>
                        <Button
                            href="https://www.facebook.com/profile.php?id=100034110155872"
                            blur="true"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon
                                className={cx("icon-contact")}
                                icon={faPhone}
                            />
                            <span>
                                Tổng đài đặt khám{" "}
                                {dataInput && dataInput.switchboard
                                    ? dataInput.switchboard
                                    : ""}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={cx("content-right")}
                onClick={() => handleClickFavourite()}
            >
                <FontAwesomeIcon
                    className={cx({ "icon-heart": isHeartActive })}
                    icon={isHeartActive ? faHeart : faHeartRegular}
                />
                <span>Yêu thích</span>
            </div>
        </div>
    );
}

export default HeaderContentDetail;