import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingDoctor.module.scss";
import Booking from "../index";
import DataCatalog from "../../../components/DataCatalog";
import * as actions from "../../../app/actions";
import { language as LANGUAGE } from "../../../utils/constant";
import BufferToBase64 from "../../../utils/BufferToBase64";

var _ = require("lodash");

const cx = classNames.bind(styles);

function BookingDoctor() {
    const [data, setData] = useState([]);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { allDoctor, language } = user;

    const handleRenderNameDoctor = (doctor) => {
        if (doctor && doctor.positionData) {
            if (language === LANGUAGE.VN) {
                return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
            } else {
                return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
            }
        }
    };

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
    }, [dispatch]);

    useEffect(() => {
        if (allDoctor && allDoctor.length > 0) {
            let arr = allDoctor.map((item) => {
                return {
                    name: handleRenderNameDoctor(item),
                    address: item.detailInfoData.workPlace,
                    image: BufferToBase64(item.image.data),
                    link: `/booking/doctor-detail/${item.id}`,
                };
            });
            setData(arr);
        }
    }, [allDoctor]);

    return (
        <div className={cx("booking-doctor-container")}>
            <Booking>
                <div className={cx("booking-doctor-content")}>
                    <div className={cx("booking-doctor-title")}>
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

export default BookingDoctor;
