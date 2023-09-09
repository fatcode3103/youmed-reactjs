import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Schedule.module.scss";
import MenuAccount from "../../components/MenuAccount";

const cx = classNames.bind(styles);

function Schedule() {
    const user = useSelector((state) => state.user);

    const { isLoading, currentUser } = user;

    return (
        <div className={cx("schedule-container")}>
            <MenuAccount>
                <div>giao dien schedule</div>
            </MenuAccount>
        </div>
    );
}

export default Schedule;
