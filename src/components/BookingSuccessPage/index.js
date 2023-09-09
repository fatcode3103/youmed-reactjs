import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./BookingSuccessPage.module.scss";
import Button from "../Button";
import Header from "../Header/Header";
import * as actions from "../../app/actions";
import PageNotFound from "../PageNotFound";

const cx = classNames.bind(styles);

function BookingSuccessPage() {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const patientId = queryParameters.get("patientId");

    const [isShowBtn, setIsShowBtn] = useState(false);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { errorCodeSuccessBooking } = user;

    useEffect(() => {
        dispatch(
            actions.postSuccessBookAppointmentAction({ patientId, token })
        );
        // delay btn
        setTimeout(() => {
            setIsShowBtn(true);
        }, 1500);
    }, [dispatch, patientId, token]);

    const handleShowBtn = () => {
        if (isShowBtn) {
            return { display: "block" };
        }
        return { display: "none" };
    };

    return (
        <div>
            {errorCodeSuccessBooking === 0 ? (
                <div className={cx("booking-success-container")}>
                    <Header />
                    {/* css success */}
                    <div className={cx("check-wrapper")}>
                        <div className={cx("check-content")}>
                            <div className={cx("check-background")}>
                                <svg
                                    viewBox="0 0 65 51"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 25L27.3077 44L58.5 7"
                                        stroke="white"
                                        strokeWidth="13"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div className={cx("check-shadow")}></div>
                        </div>
                    </div>

                    <Button
                        style={handleShowBtn()}
                        blur="true"
                        target="_blank"
                        className={cx("btn-link-email")}
                        href="https://mail.google.com/"
                    >
                        Please confirm your appointment via email
                    </Button>
                </div>
            ) : (
                <PageNotFound />
            )}
        </div>
    );
}

export default BookingSuccessPage;
