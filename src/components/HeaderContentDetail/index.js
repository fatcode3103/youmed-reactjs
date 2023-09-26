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
import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import BufferToBase64 from "../../utils/BufferToBase64";

const cx = classNames.bind(styles);

function HeaderContentDetail(props) {
    const { t } = useTranslation();
    const { dataInput } = props;
    const [isHeartActive, setIsHeartActive] = useState(false);

    const handleClickFavourite = () => {
        setIsHeartActive(!isHeartActive);
    };

    return (
        <div className={cx("header-content")}>
            <div className={cx("content-left")}>
                {dataInput && dataInput.logo && (
                    <Image
                        className={cx("logo-hospital")}
                        src={
                            dataInput.logo.data
                                ? BufferToBase64(dataInput.logo.data)
                                : null
                        }
                        size="m"
                        br10
                    />
                )}
                <div className={cx("hospital-info")}>
                    {dataInput && dataInput.name && (
                        <div className={cx("hospital-info-title")}>
                            {dataInput.name}
                        </div>
                    )}
                    {dataInput && dataInput.slogan && (
                        <div className={cx("hospital-info-slogan")}>
                            {dataInput.slogan}
                        </div>
                    )}
                    <div className={cx("hospital-info-contact")}>
                        {dataInput && dataInput.linkweb && (
                            <Button
                                href={dataInput.linkweb}
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
                        )}
                        {dataInput && dataInput.addressMap && (
                            <Button
                                href={dataInput.addressMap}
                                blur="true"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon
                                    className={cx("icon-contact")}
                                    icon={faMapLocation}
                                />
                                <span>{t("hospital_detail.address")}</span>
                            </Button>
                        )}
                        {dataInput && dataInput.switchboard && (
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
                                    {t(
                                        "hospital_detail.call_medical_examination"
                                    )}{" "}
                                    {dataInput.switchboard}
                                </span>
                            </Button>
                        )}
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
                <span>{t("hospital_detail.favourite")}</span>
            </div>
        </div>
    );
}

export default HeaderContentDetail;
