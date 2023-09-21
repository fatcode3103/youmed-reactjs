import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
    language as LANGUAGE,
    date as DATE,
    STATUS,
} from "../../utils/constant";
import * as actions from "../../app/actions";
import moment from "moment";

var _ = require("lodash");

function RenderScheduleInfo(props) {
    const { className, data, keyIndex, language, status, ...otherProps } =
        props;

    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { time } = admin;

    const {
        doctorBookingData,
        hospitalBookingData,
        clinicBookingData,
        patientBookingData,
        timeTypeBookingData,
        date,
        timeType,
    } = data;

    const dynamicEntityData =
        doctorBookingData || hospitalBookingData || clinicBookingData;

    useEffect(() => {
        dispatch(actions.getAllCodeAction("TIME"));
    }, [dispatch]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderName = (entity) => {
        if (
            entity &&
            entity.firstName &&
            entity.lastName &&
            entity.positionData
        ) {
            if (language === LANGUAGE.VN) {
                return `${entity.positionData.valueVi}, ${entity.lastName} ${entity.firstName}`;
            } else {
                return `${entity.positionData.valueEn}, ${entity.firstName} ${entity.lastName}`;
            }
        } else {
            return entity.name;
        }
    };

    const renderPatientName = (patient) => {
        if (patient && patient.firstName && patient.lastName) {
            if (language === LANGUAGE.VN) {
                return `${patient.lastName} ${patient.firstName}`;
            } else {
                return `${patient.firstName} ${patient.lastName}`;
            }
        }
    };

    const renderTime = (timeTypeBookingData) => {
        return language === LANGUAGE.VN
            ? timeTypeBookingData.valueVi
            : timeTypeBookingData.valueEn;
    };

    const renderDate = (timestamp) => {
        return capitalizeFirstLetter(
            moment(parseInt(timestamp))
                .locale(language === LANGUAGE.VN ? "vi" : "en")
                .format(
                    language === LANGUAGE.VN
                        ? DATE.DATE_CLIENT_VI
                        : DATE.DATE_CLIENT_EN
                )
        );
    };

    return (
        <div className={className} key={keyIndex} {...otherProps}>
            <p>{renderName(dynamicEntityData)}</p>
            <p>
                {timeTypeBookingData &&
                    date &&
                    `${renderTime(timeTypeBookingData)} - ${renderDate(date)}`}
            </p>
            <p>{renderPatientName(patientBookingData)}</p>
            <p>{status ? status : "updating..."}</p>
        </div>
    );
}

export default RenderScheduleInfo;
