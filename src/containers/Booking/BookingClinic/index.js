import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingClinic.module.scss";
import Booking from "../index";
import DataCatalog from "../../../components/DataCatalog";
import * as actions from "../../../app/actions";
import { language as LANGUAGE } from "../../../utils/constant";
import BufferToBase64 from "../../../utils/BufferToBase64";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingClinic() {
    const [data, setData] = useState([]);

    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { allClinic } = admin;

    useEffect(() => {
        dispatch(actions.getAllClinicAction(""));
    }, [dispatch]);

    useEffect(() => {
        if (allClinic && allClinic.length > 0) {
            let arr = allClinic.map((item) => {
                return {
                    name: item.name,
                    address: item.address,
                    image: BufferToBase64(item.logo.data),
                    link: `/booking/clinic-detail/${item.id}`,
                };
            });
            setData(arr);
        }
    }, [allClinic]);

    return (
        <div className={cx("booking-clinic-container")}>
            <Booking>
                <div className={cx("booking-clinic-content")}>
                    <div className={cx("booking-clinic-title")}>
                        <p>Đa dạng phòng khám</p>
                        <span>
                            Đặt khám dễ dàng và tiện lợi hơn với các phòng khám
                            cùng nhiều chuyên khoa
                        </span>
                    </div>
                    {data && data.length > 0 && <DataCatalog data={data} />}
                </div>
            </Booking>
        </div>
    );
}

export default BookingClinic;
