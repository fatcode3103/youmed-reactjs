import classNames from "classnames/bind";

import styles from "./PanelAppointment.module.scss";

const cx = classNames.bind(styles);

function PanelAppointment(props) {
    return (
        <div className={cx("panel-appointment-container")}>
            <div className={cx("panel-appointment-content")}>
                <div className={cx("panel-appointment-info")}>
                    <p>Đặt lịch khám Bác sĩ</p>
                    <span>Đặt lịch khám không chờ đợi</span>
                </div>
                <div className={cx("panel-appointment-info")}>
                    <p>Đặt lịch Bệnh viện</p>
                    <span>Đặt khám, thanh toán, nhận kết quả</span>
                </div>
                <div className={cx("panel-appointment-info")}>
                    <p>Đặt khám Phòng khám</p>
                    <span>Đa dạng chuyên khoa và dịch vụ</span>
                </div>
                <div className={cx("panel-appointment-info")}>
                    <p>Đặt lịch xét nghiệm</p>
                    <span>Lấy mẫu xét nghiệm tại nhà</span>
                </div>
            </div>
        </div>
    );
}

export default PanelAppointment;
