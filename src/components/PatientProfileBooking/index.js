import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./PatientProfileBooking.module.scss";
import Button from "../Button";
import { useEffect, useState } from "react";
import ModalUser from "../../containers/System/Admin/ModalUser";
import PatientInfo from "../PatientInfo";

const cx = classNames.bind(styles);

function PatientProfile(props) {
    const { handleClickBtnBooking, clickedBooking } = props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [note, setNote] = useState("");
    const [isData, setIsData] = useState(false);
    const admin = useSelector((state) => state.admin);
    const { userById } = admin;

    useEffect(() => {
        let data = { note, patient: { ...userById } };
        if (clickedBooking) {
            handleClickBtnBooking(data);
            setNote("");
        }
    }, [clickedBooking]);

    const handleAddNewProfile = () => {
        setIsData(false);
        setIsShowModal(true);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    return (
        <div className={cx("patient-profile-container")}>
            <div className={cx("patient-profile-content")}>
                <PatientInfo />
                <div className={cx("add-info")}>
                    <div className={cx("add-info-title")}>
                        Thông tin bổ sung (không bắt buộc)
                    </div>
                    <div className={cx("add-info-note")}>
                        <label>Ghi chú</label>
                        <textarea
                            value={note}
                            className={cx("form-control", "note")}
                            onChange={(e) => handleChangeNote(e)}
                        ></textarea>
                    </div>
                </div>
                <Button
                    className={cx("add-new-profile")}
                    outline="true"
                    onClick={() => handleAddNewProfile()}
                >
                    Thêm hồ sơ mới
                </Button>
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
