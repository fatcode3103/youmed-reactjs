import { path } from "../../utils/contants";
import { useTranslation } from "react-i18next";

function MenuAppointment() {
    const { t } = useTranslation();

    return [
        {
            title: t("home.appointment_doctor"),
            text: t("home.appointment_no_waitting"),
            to: path.DOCTOR_APPOINTMENT,
        },
        {
            title: t("home.hospital"),
            text: t("home.pay_result"),
            to: path.HOSPITAL_APPOINTMENT,
        },
        {
            title: t("home.appointmnet_clinic"),
            text: t("home.diverse_specialties"),
            to: path.CLINIC_APPOINTMENT,
        },
        {
            title: t("home.appointment_test"),
            text: t("home.take_samples"),
            to: path.TEST_APPOINTMENT,
        },
    ];
}

export default MenuAppointment;
