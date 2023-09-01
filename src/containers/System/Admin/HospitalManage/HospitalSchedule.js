import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, forwardRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import "moment/locale/vi";
import { useTranslation } from "react-i18next";

import styles from "./HospitalSchedule.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import Loading from "../../../../components/Loading";
import * as actions from "../../../../app/actions";
import { language as LANGUAGE } from "../../../../utils/constant";
import Button from "../../../../components/Button";
import { UseValidate } from "../../../../components/CustomHook";
import { toast } from "react-toastify";
import { date as DATE } from "../../../../utils/constant";

const cx = classNames.bind(styles);

function HospitalSchedule() {
    const { t } = useTranslation();
    const [selectHospital, setSelectHospital] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [timeActive, setTimeActive] = useState([]);
    const [isDataTime, setIsDataTime] = useState(false);
    let [timeSelected, setTimeSelected] = useState([]);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { isLoading, language } = user;
    const { time, allHospital, hospitalSchedule } = admin;

    useEffect(() => {
        dispatch(actions.getAllHospitalAction());
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch]);

    // get time by hospital
    useEffect(() => {
        if (startDate !== null) {
            let date = moment(startDate).startOf("day").valueOf();
            if (selectHospital) {
                const data = {
                    date: date,
                    hospitalId: selectHospital.value,
                };
                dispatch(actions.getHospitalScheduleAction(data));
            }
        }
    }, [startDate, selectHospital, dispatch]);

    useEffect(() => {
        if (hospitalSchedule && hospitalSchedule.timeType) {
            const timeFromDb = JSON.parse(hospitalSchedule.timeType);
            setTimeActive(timeFromDb);
            setIsDataTime(true);
        } else {
            setTimeActive([]);
            setIsDataTime(false);
        }
    }, [hospitalSchedule, time]);

    useEffect(() => {
        const arr = [];
        time.forEach((item) => {
            if (timeActive.includes(item.keyMap)) {
                arr.push(item);
            }
        });
        setTimeSelected(arr);
    }, [timeActive]);

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
            obj.value = item.id;
            obj.label = `${item.name}`;
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
            setTimeSelected((prev) => [...prev, time]);
        }
    };

    const handleSaveDoctorSchedule = () => {
        timeSelected.sort(function (a, b) {
            return a.id - b.id;
        });
        let date = moment(startDate).startOf("day").valueOf();

        let data = { selectHospital, date };

        const { isValidate, errMessage } = UseValidate(data, ["date"]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            timeSelected = timeSelected.map((item) => {
                return item.keyMap;
            });
            const timeJson = JSON.stringify(timeSelected);
            const dataSent = { ...data, timeJson };
            dispatch(actions.createHospitalScheduleAction(dataSent));
            setSelectHospital(null);
            setTimeActive([]);
            setTimeSelected([]);
            setIsDataTime(false);
        }
    };

    const handleUpdateDoctorSchedule = () => {
        timeSelected = timeSelected.map((item) => {
            return item.keyMap;
        });
        const timeJson = JSON.stringify(timeSelected);
        const dataSent = {
            date: hospitalSchedule.date,
            hospitalId: hospitalSchedule.hospitalId,
            time: timeJson,
        };
        dispatch(actions.updateHospitalcheduleAction(dataSent));
        setSelectHospital(null);
        setTimeActive([]);
        setTimeSelected([]);
        setIsDataTime(false);
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
        <div className={cx("hospital-schedule-container")}>
            {/* {console.log(hospitalSchedule)} */}
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("hospital-schedule-content")}>
                <h1>Schedule Manage</h1>
                <div className={cx("row", "form")}>
                    <div className={cx("col-4")}>
                        <label>Chọn bệnh viện</label>
                        <Select
                            value={selectHospital}
                            onChange={(e) => setSelectHospital(e)}
                            options={
                                allHospital && buildDataSelect(allHospital)
                            }
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

export default HospitalSchedule;
