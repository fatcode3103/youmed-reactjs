import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

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
        if (language === LANGUAGE.VN) {
            return `${user.lastName} ${user.firstName}`;
        } else {
            return `${user.firstName} ${user.lastName}`;
        }
    };
    const renderDateOfBirthPatient = (user) => {
        if (language === LANGUAGE.VN) {
            return moment(parseInt(user.dateOfBirth)).format(
                date.DATE_BIRTH_CLIENT_VI
            );
        } else {
            return moment(parseInt(user.dateOfBirth)).format(
                date.DATE_BIRTH_CLIENT_EN
            );
        }
    };

    const handleImageBase64 = (patient) => {
        let imgBase64 = "";
        if (patient.image) {
            imgBase64 = BufferToBase64(patient.image.data);
        }
        return imgBase64;
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
                        <span>Mã bệnh nhân</span>
                        <span>{userById.id}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>Họ và tên</span>
                        <span>{handleRenderUserName(userById)}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>Ngày sinh</span>
                        <span>{renderDateOfBirthPatient(userById)}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>Số điện thoại</span>
                        <span>{userById.phoneNumber}</span>
                    </div>
                    <div className={cx("detail-info-patient-item")}>
                        <span>Địa chỉ</span>
                        <span>{userById.address}</span>
                    </div>
                    <Button
                        outline
                        className={cx("btn-edit-profile-patient")}
                        onClick={() => handleEditProfile()}
                    >
                        Chỉnh sửa hồ sơ
                    </Button>
                </div>
            )}
            <ModalUser
                handleCloseModal={handleCloseModal}
                isShow={isShowModal}
                isData={isData}
                render={render}
                currentUserByIdEdit={userById}
                bufferToBase64={bufferToBase64}
                isPatientAction={true}
            />
        </div>
    );
}

export default PatientInfo;
