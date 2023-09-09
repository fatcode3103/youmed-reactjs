import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Profile.module.scss";
import MenuAccount from "../../components/MenuAccount";

const cx = classNames.bind(styles);

function Profile() {
    const user = useSelector((state) => state.user);

    return (
        <div className={cx("profile-container")}>
            <MenuAccount>
                <div>giao dien ho so</div>
            </MenuAccount>
        </div>
    );
}

export default Profile;
