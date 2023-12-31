import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./PatientInfo.module.scss";
import images from "../../assets/image";
import Image from "../Image";
import Button from "../Button";
import { language as LANGUAGE, date } from "../../utils/constant";
import BufferToBase64 from "../../utils/BufferToBase64";
import ModalUser from "../../containers/System/Admin/ModalUser";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function PatientInfo() {
    const { t } = useTranslation();
    const [isShowInfoPatient, setIsShowInfoPatient] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [refesh, setRefesh] = useState(false);
    const [bufferToBase64, setBufferToBase64] = useState("");
    const [isData, setIsData] = useState(false);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const { userById } = admin;
    const { language, currentUser } = user;

    useEffect(() => {
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch, refesh, currentUser]);

    const handleRenderUserName = (user) => {
        if (user.lastName && user.firstName) {
            if (language === LANGUAGE.VN) {
                return `${user.lastName} ${user.firstName}`;
            } else {
                return `${user.firstName} ${user.lastName}`;
            }
        } else {
            return "updating...";
        }
    };
    const renderDateOfBirthPatient = (user) => {
        if (user.dateOfBirth) {
            if (language === LANGUAGE.VN) {
                return moment(parseInt(user.dateOfBirth)).format(
                    date.DATE_BIRTH_CLIENT_VI
                );
            } else {
                return moment(parseInt(user.dateOfBirth)).format(
                    date.DATE_BIRTH_CLIENT_EN
                );
            }
        } else {
            return "updating...";
        }
    };

    const handleImageBase64 = (patient) => {
        if (patient.image && patient.image.data) {
            return BufferToBase64(patient.image.data);
        }
    };
    const handleEditProfile = () => {
        setBufferToBase64(handleImageBase64(userById));
        setIsData(true);
        render();
        setIsShowModal(true);
    };

    const render = () => {
        setRefesh(!refesh);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <div className={cx("patient-info")}>
            <div
                className={cx("short-info")}
                onClick={() => setIsShowInfoPatient(!isShowInfoPatient)}
            >
                <div className={cx("content-left")}>
                    <div>
                        <Image
                            size="s"
                            br="true"
                            src={
                                handleImageBase64(userById)
                                    ? handleImageBase64(userById)
                                    : images.noImage
                            }
                        />
                    </div>
                    <div className={cx("text-info")}>
                        <p className={cx("name-patient")}>
                            {handleRenderUserName(userById)}
                        </p>
                        <p className={cx("date-of-birth-patient")}>
                            {renderDateOfBirthPatient(userById)}
                        </p>
                    </div>
                </div>
                <div className={cx("content-rigth")}>
                    {isShowInfoPatient ? (
                        <FontAwesomeIcon icon={faAngleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faAngleDown} />
                    )}
                </div>
            </div>
            {isShowInfoPatient && (
                <div className={cx("detail-info-patient")}>
                    <div className={cx("detail-info-patient-item")}>
                        <span>{t("booking_page.patient_key")}</span>
                        <span>YMP{userById.id}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>{t("booking_page.patient_name")}</span>
                        <span>{handleRenderUserName(userById)}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>{t("booking_page.patient_date")}</span>
                        <span>{renderDateOfBirthPatient(userById)}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>{t("booking_page.patient_phone")}</span>
                        <span>{userById.phoneNumber}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>{t("booking_page.patient_address")}</span>
                        <span>{userById.address}</span>
                    </div>
                    <Button
                        outline
                        className={cx("btn-edit-profile-patient")}
                        onClick={() => handleEditProfile()}
                    >
                        {t("booking_page.edit_profile")}
                    </Button>
                </div>
            )}
            <ModalUser
                handleCloseModal={handleCloseModal}
                isShow={isShowModal}
                isData={isData}
                render={render}
                currentUserByIdEdit={isShowModal ? userById : {}}
                bufferToBase64={bufferToBase64}
                isPatientAction={true}
            />
        </div>
    );
}

export default PatientInfo;
