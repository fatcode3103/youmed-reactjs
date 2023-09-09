import classNames from "classnames/bind";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./SenvenDaySchedule.module.scss";
import { date, language as LANGUAGE } from "../../utils/constant";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function SevenDaySchedule({ startDate, dataScheduleFromDb = [] }) {
    const { t } = useTranslation();
    const [allDates, setAllDates] = useState([]);
    const [dateTime, setDateTime] = useState({});

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { language } = user;
    const { time } = admin;

    useEffect(() => {
        async function fetchScheduleClinic() {
            let start = moment().day(startDate);
            let arrDate = [];
            for (let i = 0; i < 7; i++) {
                let obj = {};
                if (language === LANGUAGE.VN) {
                    obj.label = capitalizeFirstLetter(
                        moment(start)
                            .add(i, "days")
                            .local(LANGUAGE.VN)
                            .format(date.DATE_CLIENT_VI)
                    );
                } else {
                    obj.label = capitalizeFirstLetter(
                        moment(start)
                            .add(i, "days")
                            .locale(LANGUAGE.EN)
                            .format(date.DATE_CLIENT_EN)
                    );
                }
                obj.value = moment(start)
                    .add(i, "day")
                    .startOf("day")
                    .valueOf()
                    .toString();
                arrDate.push(obj);
            }
            setAllDates(arrDate);
        }
        fetchScheduleClinic();
    }, [language, startDate]);

    useEffect(() => {
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch]);

    useEffect(() => {
        setDateTime(dateTimeData(dataScheduleFromDb));
    }, [dataScheduleFromDb]);

    // func uppercase letter first
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const renderDateTime = (dataArr) => {
        const dateCurrent = moment(new Date())
            .startOf("days")
            .valueOf()
            .toString();
        let html;
        if (dataArr && dataArr.length > 0) {
            html = dataArr.map((item, index) => {
                const dateItem = item.value;
                const timeArr = dateTime ? dateTime[dateItem] : [];
                return timeArr && timeArr.length > 0 ? (
                    <p
                        key={index}
                        className={cx({ active: item.value === dateCurrent })}
                    >
                        <span>{item.label}:</span>
                        {handleRenderTimeByLanguage(timeArr)}
                    </p>
                ) : (
                    <p
                        key={index}
                        className={cx({ active: item.value === dateCurrent })}
                    >
                        <span>{item.label}:</span>
                        <span>{t("booking_detail.updating")}...</span>
                    </p>
                );
            });
        }
        return html;
    };

    const handleRenderTimeByLanguage = (timeArr) => {
        let text = ``;
        let count = 0;
        const renderTimeClient = [timeArr[0], timeArr[timeArr.length - 1]];
        const length = time.length;
        for (let i = 0; i < length; i++) {
            let itemText = ``;
            if (renderTimeClient.includes(time[i].keyMap)) {
                if (count === 0) {
                    itemText = `${time[i].valueVi}`;
                } else {
                    itemText = ` ~ ${time[i].valueVi}`;
                }
                count += 1;
            }
            text += itemText;
        }
        return <span>{text}</span>;
    };

    //timeTypeData
    const dateTimeData = (dataScheduleFromDb) => {
        if (dataScheduleFromDb && dataScheduleFromDb.length > 0) {
            let obj = {};
            dataScheduleFromDb.forEach((item) => {
                let date = item.date;
                let timeType = JSON.parse(item.timeType);
                obj[date] = timeType;
            });
            return obj;
        }
    };

    return (
        <div className={cx("row")}>
            <div className={cx("column")}>{renderDateTime(allDates)}</div>
        </div>
    );
}

export default SevenDaySchedule;
