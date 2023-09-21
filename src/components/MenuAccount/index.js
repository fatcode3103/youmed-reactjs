import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./MenuAccount.module.scss";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

const cx = classNames.bind(styles);

function MenuAccount({ children }) {
    const user = useSelector((state) => state.user);

    const { isLoading } = user;

    return (
        <div className={cx("menu-acc-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("menu-acc-content", "row")}>
                <div className={cx("col-3", "menu-bar")}>
                    <MenuBar />
                </div>
                <div className={cx("col-9")}>{children}</div>
            </div>
            <Footer backGround="#fff" />
        </div>
    );
}

export default MenuAccount;
