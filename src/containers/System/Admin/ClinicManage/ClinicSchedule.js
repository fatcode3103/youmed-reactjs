import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, forwardRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import styles from "./ClinicSchedule.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import Loading from "../../../../components/Loading";
import * as actions from "../../../../app/actions";
import { language as LANGUAGE, date as DATE } from "../../../../utils/constant";
import Button from "../../../../components/Button";
import moment from "moment";
import { UseValidate } from "../../../../components/CustomHook";

const cx = classNames.bind(styles);

function ClinicSchedule() {
    const [selectClinic, setSelectClinic] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [timeActive, setTimeActive] = useState([]);
    const [isAllTimeSelected, setIsAllTimeSelected] = useState(false);
    const [isDataTime, setIsDataTime] = useState(false);
    let [timeSelected, setTimeSelected] = useState([]);
    const { t } = useTranslation();

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading, language } = user;
    const { allClinic, time, clinicSchedule } = admin;

    useEffect(() => {
        dispatch(actions.getAllClinicAction(""));
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch]);

    // get time by clinic
    useEffect(() => {
        if (startDate !== null) {
            let date = moment(startDate).startOf("day").valueOf();
            if (selectClinic) {
                const data = {
                    date: date,
                    clinicId: selectClinic.value,
                };
                dispatch(actions.getClinicScheduleAction(data));
            }
        }
    }, [startDate, selectClinic, dispatch]);

    // get-update
    useEffect(() => {
        if (clinicSchedule && clinicSchedule.timeType) {
            const timeFromDb = JSON.parse(clinicSchedule.timeType);
            setTimeActive(timeFromDb);
            setIsDataTime(true);
        } else {
            setTimeActive([]);
            setIsDataTime(false);
        }
    }, [clinicSchedule, time]);

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
    const handleTimeClicked = (time) => {
        if (timeActive.includes(time.keyMap)) {
            setTimeActive((prev) =>
                prev.filter((item) => item !== time.keyMap)
            );
        } else {
            setTimeActive((prev) => [...prev, time.keyMap]);
        }
    };

    const handleSelectAllTime = () => {
        setIsAllTimeSelected(!isAllTimeSelected);
    };

    const handleSaveDoctorSchedule = () => {
        timeSelected.sort(function (a, b) {
            return a.id - b.id;
        });
        let date = moment(startDate).startOf("day").valueOf();

        let data = { selectClinic, date };

        const { isValidate, errMessage } = UseValidate(data, ["date"]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            timeSelected = timeSelected.map((item) => {
                return item.keyMap;
            });
            const timeJson = JSON.stringify(timeSelected);
            const dataSent = { ...data, timeJson };
            dispatch(actions.createClinicScheduleAction(dataSent));
            setSelectClinic(null);
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
            date: clinicSchedule.date,
            clinicId: clinicSchedule.clinicId,
            timeJson: timeJson,
        };
        dispatch(actions.updateClinicScheduleByIdAction(dataSent));
        setSelectClinic(null);
        setTimeActive([]);
        setTimeSelected([]);
        setIsDataTime(false);
        setIsAllTimeSelected(false);
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
        <div className={cx("clinic-schedule-container")}>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("clinic-schedule-content")}>
                <div className={cx("hospital-schedule-content")}>
                    <h1>{t("system.clinic_schedule_manage.title")}</h1>
                    <div className={cx("row", "form")}>
                        <div className={cx("col-4")}>
                            <label>
                                {t("system.clinic_schedule_manage.input_1")}
                            </label>
                            <Select
                                value={selectClinic}
                                onChange={(e) => setSelectClinic(e)}
                                options={
                                    allClinic && buildDataSelect(allClinic)
                                }
                            />
                        </div>
                        <div className={cx("col-4", "date")}>
                            <label>
                                {t("system.clinic_schedule_manage.input_2")}
                            </label>
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
                    <div className={cx("form-check form-switch", "mt-3")}>
                        <input
                            className={cx("form-check-input")}
                            type="checkbox"
                            onClick={() => handleSelectAllTime()}
                            checked={isAllTimeSelected}
                        />
                        <label>
                            {isAllTimeSelected
                                ? t(
                                      "system.clinic_schedule_manage.deselect_all"
                                  )
                                : t("system.clinic_schedule_manage.select_all")}
                        </label>
                    </div>
                    {isDataTime ? (
                        <Button
                            normal
                            className={cx("btn-update")}
                            onClick={() => handleUpdateDoctorSchedule()}
                        >
                            {t("system.clinic_schedule_manage.update")}
                        </Button>
                    ) : (
                        <Button
                            normal
                            className={cx("btn-save")}
                            onClick={() => handleSaveDoctorSchedule()}
                        >
                            {t("system.clinic_schedule_manage.save")}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClinicSchedule;
