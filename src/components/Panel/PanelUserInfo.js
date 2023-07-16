import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../app/actions";
import styles from "./PanelUserInfo.module.scss";

const cx = classNames.bind(styles);

function PanelUserInfo(props) {
    const dispatch = useDispatch();

    const handleUserLogout = () => {
        dispatch(actions.logoutAction());
    };

    return (
        <div className={cx("panel-user-info-container")}>
            <div className={cx("panel-user-info-content")}>
                <div className={cx("panel-user-info")}>
                    <p>Lịch Khám</p>
                </div>
                <div className={cx("panel-user-info")}>
                    <p>Lịch sử thanh toán</p>
                </div>
                <div className={cx("panel-user-info")}>
                    <p>Hồ sơ</p>
                </div>
                <div
                    className={cx("panel-user-info-exit")}
                    onClick={() => handleUserLogout()}
                >
                    <p>Thoát</p>
                </div>
            </div>
        </div>
    );
}

export default PanelUserInfo;
