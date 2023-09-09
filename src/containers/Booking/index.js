import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./BookingPage.module.scss";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import BookingHomeHeader from "./BookingHomeHeader/BookingHomeHeader";
import DataCatalog from "../../components/DataCatalog";
import DownloadAppSection from "../Home/DownloadAppSection";
import Footer from "../../components/Footer";
import { navBooking } from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function BookingPage({ children }) {
    const location = useLocation();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLoading } = user;

    return (
        <div className={cx("booking-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("booking-content")}>
                <BookingHomeHeader />
                <div className={cx("booking-body")}>
                    <div className={cx("booking-navbar")}>
                        {navBooking &&
                            navBooking.length > 0 &&
                            navBooking.map((item, index) => {
                                const isActive = location.pathname === item.to;

                                return (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        className={cx("booking-navbar-item", {
                                            active: isActive,
                                        })}
                                    >
                                        <span
                                            className={cx(
                                                "booking-navbar-item-icon"
                                            )}
                                        >
                                            {item.icon}
                                        </span>
                                        <span>{item.title}</span>
                                    </NavLink>
                                );
                            })}
                    </div>
                    <div className={cx("booking-catalog")}>{children}</div>
                </div>
            </div>
            <DownloadAppSection />
            <Footer />
        </div>
    );
}

export default BookingPage;
