import classNames from "classnames/bind";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import styles from "./PatientProfileBooking.module.scss";
import Button from "../Button";
import images from "../../assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { language as LANGUAGE, date } from "../../utils/constant";

const cx = classNames.bind(styles);

function PatientProfile() {
    const [isShowInfoPatient, setIsShowInfoPatient] = useState(false);
    const [showModalNewProfile, setShowModalNewProfile] = useState(false);
    const user = useSelector((state) => state.user);
    const { currentUser, language } = user;

    const shortName = currentUser.firstName.slice(0, 2).toUpperCase();

    const handleRenderUserName = (user) => {
        if (language === LANGUAGE.VN) {
            return `${user.lastName} ${user.firstName}`;
        } else {
            return `${user.firstName} ${user.lastName}`;
        }
    };
    const handleCloseModalAddNewProfile = () => setShowModalNewProfile(false);
    const handleAddNewProfile = () => setShowModalNewProfile(true);

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

    return (
        <div className={cx("patient-profile-container")}>
            <div className={cx("patient-profile-content")}>
                <div
                    className={cx("patient-info")}
                    onClick={() => setIsShowInfoPatient(!isShowInfoPatient)}
                >
                    <div className={cx("short-info")}>
                        <div className={cx("content-left")}>
                            <div>
                                <p className={cx("folder-1")}>
                                    {images.folder1}
                                </p>
                                <p className={cx("folder-2")}>
                                    {images.folder2}
                                </p>
                                <p className={cx("short-name")}>{shortName}</p>
                            </div>
                            <div className={cx("text-info")}>
                                <p className={cx("name-patient")}>
                                    {handleRenderUserName(currentUser)}
                                </p>
                                <p className={cx("date-of-birth-patient")}>
                                    {renderDateOfBirthPatient(currentUser)}
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
                            thong tin chi tiet
                        </div>
                    )}
                </div>
                <div className={cx("add-info")}>
                    <div className={cx("add-info-title")}>
                        Thông tin bổ sung (không bắt buộc)
                    </div>
                    <div className={cx("add-info-note")}>
                        <label>Ghi chú</label>
                        <textarea
                            className={cx("form-control", "note")}
                        ></textarea>
                    </div>
                    <div className={cx("add-info-file")}>
                        <label>Tệp đính kèm</label>
                        <input className={cx("form-control")} type="file" />
                    </div>
                </div>
                <Button
                    className={cx("add-new-profile")}
                    outline
                    onClick={() => handleAddNewProfile()}
                >
                    Thêm hồ sơ mới
                </Button>

                <Modal
                    centered
                    size="lg"
                    show={showModalNewProfile}
                    onHide={() => handleCloseModalAddNewProfile()}
                >
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "18px" }}>
                            Thêm hồ sơ mới
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Content</Modal.Body>
                    <Modal.Footer>
                        <Button
                            size="s"
                            outline
                            onClick={() => handleCloseModalAddNewProfile()}
                        >
                            Close
                        </Button>
                        <Button
                            size="s"
                            normal
                            onClick={() => handleCloseModalAddNewProfile()}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default PatientProfile;
