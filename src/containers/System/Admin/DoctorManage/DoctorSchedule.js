import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, forwardRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import "moment/locale/vi";
import { useTranslation } from "react-i18next";

import styles from "./DoctorSchedule.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import Loading from "../../../../components/Loading";
import * as actions from "../../../../app/actions";
import { language as LANGUAGE } from "../../../../utils/constant";
import Button from "../../../../components/Button";
import { UseValidate } from "../../../../components/CustomHook";
import { toast } from "react-toastify";
import { date as DATE } from "../../../../utils/constant";

const cx = classNames.bind(styles);

function DoctorSchedule() {
    const { t } = useTranslation();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [timeActive, setTimeActive] = useState([]);
    const [isDataTime, setIsDataTime] = useState(false);
    let [timeSelected, setTimeSelected] = useState([]);
    const [isAllTimeSelected, setIsAllTimeSelected] = useState(false);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { isLoading, allDoctor, language } = user;
    const { time, doctorSchedule } = admin;

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch]);

    useEffect(() => {
        if (startDate !== null) {
            let date = moment(startDate).startOf("day").valueOf();
            if (selectedDoctor) {
                const data = {
                    date: date,
                    doctorId: selectedDoctor.value,
                };
                dispatch(actions.getDoctorScheduleAction(data));
            }
        }
    }, [startDate, selectedDoctor, dispatch]);

    useEffect(() => {
        if (doctorSchedule && doctorSchedule.timeType) {
            const timeFromDb = JSON.parse(doctorSchedule.timeType);
            setTimeActive(timeFromDb);
            setIsDataTime(true);
        } else {
            setTimeActive([]);
            setIsDataTime(false);
        }
    }, [doctorSchedule, time]);

    useEffect(() => {
        const arr = [];
        time.forEach((item) => {
            if (timeActive.includes(item.keyMap)) {
                arr.push(item);
            }
        });
        setTimeSelected(arr);
    }, [timeActive]);

    useEffect(() => {
        if (isAllTimeSelected) {
            let allKeyTime = time.map((item) => {
                return item.keyMap;
            });
            setTimeActive((prev) => [...prev, ...allKeyTime]);
        } else {
            setTimeActive([]);
        }
    }, [isAllTimeSelected]);

    const handleChangeDate = (date) => {
        setStartDate(date);
    };

    const renderTimeByLanguage = (time) => {
        if (language === LANGUAGE.VN) {
            return time.valueVi;
        } else {
            return time.valueEn;
        }
    };

    const buildDataSelect = (data) => {
        let arr = [];
        data.forEach((item) => {
            let obj = {};
            if (language === LANGUAGE.VN) {
                obj.value = item.id;
                obj.label = `${item.lastName} ${item.firstName}`;
            } else {
                obj.value = item.id;
                obj.label = `${item.firstName} ${item.lastName}`;
            }
            arr.push(obj);
        });
        return arr;
    };

    const handleTimeClicked = (time) => {
        if (timeActive.includes(time.keyMap)) {
            setTimeActive((prev) =>
                prev.filter((item) => item !== time.keyMap)
            );
        } else {
            setTimeActive((prev) => [...prev, time.keyMap]);
        }
    };

    const handleSaveDoctorSchedule = () => {
        timeSelected.sort(function (a, b) {
            return a.id - b.id;
        });
        let date = moment(startDate).startOf("day").valueOf();

        let data = { selectedDoctor, date };

        const { isValidate, errMessage } = UseValidate(data, ["date"]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            timeSelected = timeSelected.map((item) => {
                return item.keyMap;
            });
            const timeJson = JSON.stringify(timeSelected);
            const dataSent = { ...data, timeJson };
            dispatch(actions.postDoctorScheduleAction(dataSent));
            setSelectedDoctor(null);
            setTimeActive([]);
            setTimeSelected([]);
            setIsDataTime(false);
            setIsAllTimeSelected(false);
        }
    };

    const handleUpdateDoctorSchedule = () => {
        timeSelected = timeSelected.map((item) => {
            return item.keyMap;
        });
        const timeJson = JSON.stringify(timeSelected);
        const dataSent = {
            date: doctorSchedule.date,
            doctorId: doctorSchedule.doctorId,
            time: timeJson,
        };
        dispatch(actions.updateDoctorScheduleAction(dataSent));
        setSelectedDoctor(null);
        setTimeActive([]);
        setTimeSelected([]);
        setIsDataTime(false);
        setIsAllTimeSelected(false);
    };

    const handleSelectAllTime = () => {
        setIsAllTimeSelected(!isAllTimeSelected);
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            className={cx("date-picker-custom-input")}
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ));

    return (
        <div className={cx("doctor-schedule-container")}>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("doctor-schedule-content")}>
                <h1>Doctor schedule management</h1>
                <div className={cx("row", "form")}>
                    <div className={cx("col-4")}>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e)}
                            options={allDoctor && buildDataSelect(allDoctor)}
                        />
                    </div>
                    <div className={cx("col-4", "date")}>
                        <label>Chọn ngày</label>
                        <DatePicker
                            minDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            yearDropdownItemNumber={10}
                            scrollableYearDropdown
                            withPortal
                            className={cx("date-picker")}
                            selected={startDate}
                            onChange={(date) => handleChangeDate(date)}
                            customInput={<ExampleCustomInput />}
                            dateFormat={
                                language === LANGUAGE.VN
                                    ? DATE.DATE_BIRTH_PICKER_CLIENT_VI
                                    : DATE.DATE_BIRTH_PICKER_CLIENT_EN
                            }
                        />
                    </div>
                    <div className={cx("col-12")}></div>
                </div>
                <div className={cx("time")}>
                    {time &&
                        time.length > 0 &&
                        time.map((item, index) => {
                            return (
                                <Button
                                    onClick={() => handleTimeClicked(item)}
                                    key={index}
                                    outline
                                    className={cx("time-item", {
                                        active: timeActive.includes(
                                            item.keyMap
                                        ),
                                    })}
                                >
                                    {renderTimeByLanguage(item)}
                                </Button>
                            );
                        })}
                </div>
                <div className={cx("form-check form-switch", "mt-3")}>
                    <input
                        className={cx("form-check-input")}
                        type="checkbox"
                        onClick={() => handleSelectAllTime()}
                        checked={isAllTimeSelected}
                    />
                    <label>
                        {isAllTimeSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                    </label>
                </div>
                {isDataTime ? (
                    <Button
                        normal
                        className={cx("btn-update")}
                        onClick={() => handleUpdateDoctorSchedule()}
                    >
                        Update
                    </Button>
                ) : (
                    <Button
                        normal
                        className={cx("btn-save")}
                        onClick={() => handleSaveDoctorSchedule()}
                    >
                        Save
                    </Button>
                )}
            </div>
        </div>
    );
}

export default DoctorSchedule;
