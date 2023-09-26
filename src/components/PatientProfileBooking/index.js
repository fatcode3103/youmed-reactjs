import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./PatientProfileBooking.module.scss";
import Button from "../Button";
import { useState } from "react";
import ModalUser from "../../containers/System/Admin/ModalUser";
import PatientInfo from "../PatientInfo";
import { language as LANGUAGE } from "../../utils/constant";

var _ = require("lodash");

const cx = classNames.bind(styles);

function PatientProfile(props) {
    const { getDataFromChildrenComponent, handleCompleteStep } = props;
    const { t } = useTranslation();

    const [isShowModal, setIsShowModal] = useState(false);
    const [note, setNote] = useState("");
    const [isData, setIsData] = useState(false);
    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const { userById } = admin;
    const { language } = user;

    const handleAddNewProfile = () => {
        setIsData(false);
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const renderNamePatient = (user) => {
        if (!_.isEmpty(user)) {
            if (language === LANGUAGE.VN) {
                return `${user.lastName} ${user.firstName}`;
            } else {
                return `${user.firstName} ${user.lastName}`;
            }
        }
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    const handleConfirmInfo = () => {
        getDataFromChildrenComponent({
            patientId: userById.id,
            namePatient: renderNamePatient(userById),
            emailPatient: userById.email,
            patientInfo: [
                {
                    label: t("email.patient_name"),
                    value: renderNamePatient(userById),
                },
                {
                    label: "Email",
                    value: userById.email,
                },
                {
                    label: t("email.patient_address"),
                    value: userById.address,
                },
                {
                    label: t("email.patient_phone"),
                    value: userById.phoneNumber,
                },
                {
                    label: t("email.note"),
                    value: note,
                },
            ],
            note: note,
        });
        handleCompleteStep();
    };

    return (
        <div className={cx("patient-profile-container")}>
            <div className={cx("patient-profile-content")}>
                <PatientInfo />
                <div className={cx("add-info")}>
                    <div className={cx("add-info-title")}>
                        {t("booking_page.booking_info")}
                    </div>
                    <div className={cx("add-info-note")}>
                        <label>{t("booking_page.note")}</label>
                        <textarea
                            className={cx("form-control", "note")}
                            onChange={(e) => handleChangeNote(e)}
                        ></textarea>
                    </div>
                </div>
                <div className={cx("btn-wrapper")}>
                    <Button
                        className={cx("add-new-profile")}
                        outline="true"
                        onClick={() => handleAddNewProfile()}
                    >
                        {t("booking_page.add_new_profile")}
                    </Button>
                    <Button
                        className={cx("confirm-info")}
                        normal="true"
                        onClick={() => handleConfirmInfo()}
                    >
                        {t("booking_page.confirm")}
                    </Button>
                </div>
            </div>
            <ModalUser
                handleCloseModal={handleCloseModal}
                isShow={isShowModal}
                isData={isData}
                currentUserByIdEdit={userById}
                isPatientAction={true}
            />
        </div>
    );
}

export default PatientProfile;
