import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import * as actions from "../../../app/actions";
import styles from "./ModalUser.module.scss";
import { UseForm, UseValidate } from "../../../components/CustomHook";
import { toast } from "react-toastify";
import { language as LANGUAGE } from "../../../utils/constant";
import PhotoProvider from "../../../components/PhotoProvider";
import DatePicker from "react-datepicker";
import { date as DATE, role as ROLE } from "../../../utils/constant";

const cx = classNames.bind(styles);

function ModalUser(props) {
    const {
        currentUserByIdEdit,
        handleCloseModal,
        bufferToBase64,
        render = () => {},
        isPatientAction = false,
        isShow,
        isData,
    } = props;
    const { t } = useTranslation();
    const adminState = useSelector((state) => state.admin);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [hasChangeDateOfBirth, setHasChangeDateOfBirth] = useState(false);

    const {
        gender: genderArr,
        role: roleArr,
        position: positionArr,
    } = adminState;

    const { language } = userState;

    let initState = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        date: new Date(),
        address: "",
        phoneNumber: "",
        gender: "",
        position: "",
        role: ROLE.PATIENT,
        img: null,
        preview: "",
    };

    const { form, setForm, handleOnChangeInput, handleOnChangeImg, resetForm } =
        UseForm(initState);

    const {
        email,
        firstName,
        lastName,
        password,
        address,
        date,
        phoneNumber,
        gender,
        position,
        role,
        img,
        preview,
    } = form;

    useEffect(() => {
        dispatch(actions.getAllCodeAction("GENDER"));
        dispatch(actions.getAllCodeAction("ROLE"));
        dispatch(actions.getAllCodeAction("POSITION"));
    }, [dispatch]);

    useEffect(() => {
        if (isData) {
            setForm({
                id: currentUserByIdEdit.id,
                email: currentUserByIdEdit.email,
                firstName: currentUserByIdEdit.firstName,
                lastName: currentUserByIdEdit.lastName,
                password: currentUserByIdEdit.password,
                address: currentUserByIdEdit.address,
                date: +currentUserByIdEdit.dateOfBirth,
                phoneNumber: currentUserByIdEdit.phoneNumber,
                gender: currentUserByIdEdit.gender,
                position: currentUserByIdEdit.positionId,
                role: currentUserByIdEdit.roleId,
                img: bufferToBase64,
                preview: bufferToBase64,
            });
        } else {
            setForm(initState);
        }
        setHasChangeDateOfBirth(false);
    }, [currentUserByIdEdit, isData]);

    const handleSaveUser = async () => {
        let dateTimestamp = date.getTime();
        const { isValidate, errMessage } = UseValidate(form, [
            "img",
            "preview",
            "date",
        ]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            let data = { ...form, date: dateTimestamp };
            await dispatch(actions.postUserAction(data));
            handleCloseModal();
            resetForm();
            render();
        }
    };

    const handleUpdateUser = async () => {
        let dateTimestamp = hasChangeDateOfBirth ? date.getTime() : date;
        let ignoreArr = ["id", "img", "preview", "date"];
        const { isValidate, errMessage } = UseValidate(form, [...ignoreArr]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            let data = { ...form, date: dateTimestamp };
            await dispatch(actions.editUserAction(data));
            handleCloseModal();
            resetForm();
            render();
        }
    };

    const handleClose = () => {
        handleCloseModal();
        resetForm();
    };

    return (
        <>
            <Modal
                show={isShow}
                onHide={() => {
                    handleClose();
                }}
                centered
                size="lg"
            >
                <Modal.Body className={cx("p-5")}>
                    <div className={cx("row form- mb-4")}>
                        <div className={cx("col-4")}>
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={
                                    isData
                                        ? null
                                        : (e) => handleOnChangeInput(e)
                                }
                                name="email"
                                value={email}
                                id="email"
                                type="email"
                                disabled={isData}
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-4")}>
                            <label>First Name</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={firstName}
                                name="firstName"
                                type="text"
                                className={cx("form-control ")}
                            />
                        </div>
                        <div className={cx("col-4")}>
                            <label>Last Name</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={lastName}
                                name="lastName"
                                type="text"
                                className={cx("form-control ")}
                            />
                        </div>
                        <div className={cx("col-4")}>
                            <label>Password</label>
                            <input
                                disabled={isData}
                                onChange={
                                    isData
                                        ? null
                                        : (e) => handleOnChangeInput(e)
                                }
                                value={password}
                                name="password"
                                type="password"
                                className={cx("form-control ")}
                            />
                        </div>
                        <div className={cx("col-8")}>
                            <label>Phone Number</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={phoneNumber}
                                name="phoneNumber"
                                type="text"
                                className={cx("form-control ")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>Date of birth</label>
                            <DatePicker
                                dateFormat={
                                    language === LANGUAGE.VN
                                        ? DATE.DATE_BIRTH_PICKER_CLIENT_VI
                                        : DATE.DATE_BIRTH_PICKER_CLIENT_EN
                                }
                                maxDate={new Date()}
                                scrollableYearDropdown
                                showYearDropdown
                                yearDropdownItemNumber={100}
                                showMonthDropdown
                                withPortal
                                selected={date}
                                onChange={(e) => {
                                    setHasChangeDateOfBirth(true);
                                    handleOnChangeInput({
                                        target: {
                                            name: "date",
                                            value: e,
                                        },
                                    });
                                }}
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-9")}>
                            <label>Address</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={address}
                                name="address"
                                type="text"
                                className={cx("form-control ")}
                            />
                        </div>
                    </div>
                    <div className={cx("row form-group mb-2")}>
                        <div className={cx("col-3")}>
                            <label>Gender</label>
                            <select
                                value={gender}
                                name="gender"
                                className={cx("form-control ")}
                                onChange={(e) => handleOnChangeInput(e)}
                            >
                                <option>---</option>
                                {genderArr &&
                                    genderArr.length > 0 &&
                                    genderArr.map((item, index) => {
                                        return (
                                            <option
                                                value={item.keyMap}
                                                key={index}
                                            >
                                                {language === LANGUAGE.VN
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className={cx("col-3")}>
                            <label>Position</label>
                            <select
                                value={position}
                                name="position"
                                className={cx("form-control ")}
                                onChange={(e) => handleOnChangeInput(e)}
                            >
                                <option>---</option>
                                {positionArr &&
                                    positionArr.length > 0 &&
                                    positionArr.map((item, index) => {
                                        return (
                                            <option
                                                value={item.keyMap}
                                                key={index}
                                            >
                                                {language === LANGUAGE.VN
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className={cx("col-3")}>
                            <label>Role</label>
                            <select
                                value={role}
                                name="role"
                                className={cx("form-control ")}
                                onChange={
                                    isPatientAction
                                        ? null
                                        : (e) => handleOnChangeInput(e)
                                }
                                disabled={isPatientAction}
                            >
                                <option>---</option>
                                {roleArr &&
                                    roleArr.length > 0 &&
                                    roleArr.map((item, index) => {
                                        return (
                                            <option
                                                value={item.keyMap}
                                                key={index}
                                            >
                                                {language === LANGUAGE.VN
                                                    ? item.valueVi
                                                    : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className={cx("col-3")}>
                            <label>Avatar</label>
                            <input
                                onChange={(e) => {
                                    handleOnChangeImg(e);
                                }}
                                type="file"
                                accept="image/*"
                                className={cx("form-control ")}
                            />
                            <div className={cx("preview")}>
                                <span>{t("system.user_manage.preview")}: </span>
                                <PhotoProvider src={preview ? preview : ""}>
                                    <img
                                        src={preview ? preview : ""}
                                        alt=""
                                        className={cx("img-preview")}
                                    />
                                </PhotoProvider>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => handleClose()}
                        size="xm"
                    >
                        Close
                    </Button>
                    {!isData ? (
                        <Button
                            variant="primary"
                            onClick={() => handleSaveUser()}
                            size="xm"
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="warning"
                            onClick={() => handleUpdateUser()}
                            size="xm"
                        >
                            Update
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;
