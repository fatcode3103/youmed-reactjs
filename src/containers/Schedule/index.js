import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import styles from "./Schedule.module.scss";
import MenuAccount from "../../components/MenuAccount";
import Loading from "../../components/Loading";
import * as actions from "../../app/actions";
import RenderScheduleInfo from "../../components/RenderScheduleInfo";
import RenderBookingInfo from "../../components/RenderBookingInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { language as LANGUAGE } from "../../utils/constant";

const cx = classNames.bind(styles);

function Schedule() {
    const [selectedItem, setSelectedItem] = useState(0);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLoading, currentUser, allBookingAppointmentById, language } =
        user;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getBookingAppointmentAction(currentUser.id));
    }, [dispatch, currentUser]);

    const handleClickScheduleItem = (index) => {
        setSelectedItem(index);
    };

    const handleGetStatus = (statusBookingData) => {
        if (statusBookingData) {
            return language === LANGUAGE.VN
                ? statusBookingData.valueVi
                : statusBookingData.valueEn;
        }
    };

    return (
        <div className={cx("schedule-container")}>
            {isLoading && <Loading />}
            <MenuAccount>
                <div className={cx("schedule-wrapper")}>
                    <div className={cx("schedule-title")}>Lịch khám</div>
                    <div className={cx("schedule-content", "row")}>
                        {allBookingAppointmentById &&
                        allBookingAppointmentById.length > 0 ? (
                            <>
                                <div className={cx("content-left", "col-5")}>
                                    {[]
                                        .concat(allBookingAppointmentById)
                                        .reverse()
                                        .map((item, index) => {
                                            return (
                                                <RenderScheduleInfo
                                                    className={cx(
                                                        "schedule-item",
                                                        {
                                                            active:
                                                                index ===
                                                                selectedItem,
                                                        }
                                                    )}
                                                    data={item}
                                                    keyIndex={index}
                                                    language={language}
                                                    onClick={() =>
                                                        handleClickScheduleItem(
                                                            index
                                                        )
                                                    }
                                                    status={handleGetStatus(
                                                        item.statusBookingData
                                                    )}
                                                />
                                            );
                                        })}
                                </div>
                                <div className={cx("content-right", "col-7")}>
                                    {
                                        <RenderBookingInfo
                                            data={
                                                []
                                                    .concat(
                                                        allBookingAppointmentById
                                                    )
                                                    .reverse()[selectedItem]
                                            }
                                            language={language}
                                            status={handleGetStatus(
                                                []
                                                    .concat(
                                                        allBookingAppointmentById
                                                    )
                                                    .reverse()[selectedItem]
                                                    .statusBookingData
                                            )}
                                        />
                                    }
                                </div>
                            </>
                        ) : (
                            <div>
                                Không có lịch khám nào được đặt{" "}
                                <FontAwesomeIcon icon={faCircleExclamation} />
                            </div>
                        )}
                    </div>
                </div>
            </MenuAccount>
        </div>
    );
}

export default Schedule;
