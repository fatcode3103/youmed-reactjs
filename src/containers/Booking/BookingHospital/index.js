import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./BookingHospital.module.scss";
import Booking from "../index";
import DataCatalog from "../../../components/DataCatalog";
import * as actions from "../../../app/actions";
import BufferToBase64 from "../../../utils/BufferToBase64";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingHospital() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);

    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { allHospital } = admin;

    useEffect(() => {
        dispatch(actions.getAllHospitalAction(""));
    }, [dispatch]);

    useEffect(() => {
        if (allHospital && allHospital.length > 0) {
            let arr = allHospital.map((item) => {
                return {
                    name: item.name ? item.name : "updating",
                    address: item.address ? item.address : "updating...",
                    image:
                        item.logo &&
                        item.logo.data &&
                        BufferToBase64(item.logo.data),
                    link: `/booking/hospital-detail/${item.id}`,
                };
            });
            setData(arr);
        }
    }, [allHospital]);

    return (
        <div className={cx("booking-hospital-container")}>
            <Booking>
                <div className={cx("booking-hospital-content")}>
                    <div className={cx("booking-hospital-title")}>
                        <p>{t("booking.title_hospital_1")}</p>
                        <span>{t("booking.title_hospital_2")}</span>
                    </div>
                    {data && data.length > 0 && <DataCatalog data={data} />}
                </div>
            </Booking>
        </div>
    );
}

export default BookingHospital;
