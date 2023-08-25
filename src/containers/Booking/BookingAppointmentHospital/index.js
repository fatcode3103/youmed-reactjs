import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./BookingAppointmentHospital.module.scss";
import BookingAppoimentPage from "../../../components/BookingAppointmentPage";
import BookingSection from "../../../components/BookingSection";
import PatientProfile from "../../../components/PatientProfileBooking";
import Loading from "../../../components/Loading";
import Header from "../../../components/Header/Header";

const cx = classNames.bind(styles);

function BookingAppointmentHospital() {
    let { id } = useParams();

    const user = useSelector((state) => state.user);
    const { isLoading } = user;
    const admin = useSelector((state) => state.admin);

    const dispatch = useDispatch();

    const sectionStepData = [
        {
            title: "Bệnh nhân",
            component: PatientProfile,
            data: [{ value: "" }],
        },
        {
            title: "Bệnh nhân",
            component: PatientProfile,
            data: [{ value: "" }],
        },
        {
            title: "Bệnh nhân",
            component: PatientProfile,
            data: [{ value: "" }],
        },
    ];

    return (
        <div>
            {isLoading && <Loading />}
            <Header />
            <BookingAppoimentPage id={33} sectionStepData={sectionStepData} />
        </div>
    );
}

export default BookingAppointmentHospital;
