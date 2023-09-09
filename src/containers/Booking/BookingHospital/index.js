import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingHospital.module.scss";
import Booking from "../index";
import DataCatalog from "../../../components/DataCatalog";
import * as actions from "../../../app/actions";
import { language as LANGUAGE } from "../../../utils/constant";
import BufferToBase64 from "../../../utils/BufferToBase64";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingHospital() {
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
                    name: item.name,
                    address: item.address,
                    image: BufferToBase64(item.logo.data),
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
                        <p>Đặt khám trực tuyến với các Bệnh viện</p>
                        <span>
                            Chủ động chọn lịch hẹn - Đi khám không đợi chờ
                        </span>
                    </div>
                    {data && data.length > 0 && <DataCatalog data={data} />}
                </div>
            </Booking>
        </div>
    );
}

export default BookingHospital;
