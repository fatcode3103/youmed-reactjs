import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import * as actions from "../../../app/actions";
import styles from "./ModalUser.module.scss";
import { UseForm, UseValidate } from "../../../components/CustomHook";
import { toast } from "react-toastify";
import { language as LANGUAGE } from "../../../utils/contants";

const cx = classNames.bind(styles);

function ModalUser(props) {
    const { render, currentUserByIdEdit, isShow, handleCloseModal, isData } =
        props;
    const { t } = useTranslation();

    const { admin: adminState, user: userState } = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();

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
        address: "",
        phoneNumber: "",
        gender: "",
        position: "",
        role: "",
    };

    const [form, setForm, handleOnChangeInput, resetForm] = UseForm(initState);

    const {
        email,
        firstName,
        lastName,
        password,
        address,
        phoneNumber,
        gender,
        position,
        role,
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
                phoneNumber: currentUserByIdEdit.phoneNumber,
                gender: currentUserByIdEdit.gender,
                position: currentUserByIdEdit.positionId,
                role: currentUserByIdEdit.roleId,
            });
        } else {
            setForm(initState);
        }
    }, [currentUserByIdEdit]);

    const handleSaveUser = () => {
        const [isValidate, errMessage] = UseValidate(form);
        if (!isValidate) {
            toast.warning(errMessage);
        } else {
            let data = { ...form };
            dispatch(actions.postUserAction(data));
            handleCloseModal();
            resetForm();
        }
        render();
    };

    const handleUpdateUser = () => {
        const [isValidate, errMessage] = UseValidate(form);
        if (!isValidate) {
            toast.warning(errMessage);
        } else {
            let data = { ...form };
            dispatch(actions.editUserAction(data));
            handleCloseModal();
            resetForm();
        }
        render();
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
                        <div className={cx("col-3")}>
                            <label>Email</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                name="email"
                                value={email}
                                type="email"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>First Name</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={firstName}
                                name="firstName"
                                type="text"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>Last Name</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={lastName}
                                name="lastName"
                                type="text"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>Password</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={password}
                                name="password"
                                type="password"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                    </div>
                    <div className={cx("row form-group mb-4")}>
                        <div className={cx("col-6")}>
                            <label>Address</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={address}
                                name="address"
                                type="text"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                        <div className={cx("col-6")}>
                            <label>Phone Number</label>
                            <input
                                onChange={(e) => handleOnChangeInput(e)}
                                value={phoneNumber}
                                name="phoneNumber"
                                type="text"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                    </div>
                    <div className={cx("row form-group mb-2")}>
                        <div className={cx("col-3")}>
                            <label>Gender</label>
                            <select
                                value={gender}
                                name="gender"
                                className={cx("form-control form-control-lg")}
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
                                className={cx("form-control form-control-lg")}
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
                                className={cx("form-control form-control-lg")}
                                onChange={(e) => handleOnChangeInput(e)}
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
                                type="file"
                                className={cx("form-control form-control-lg")}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => handleClose()}
                        size="lg"
                    >
                        Close
                    </Button>
                    {!isData ? (
                        <Button
                            variant="primary"
                            onClick={() => handleSaveUser()}
                            size="lg"
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            variant="warning"
                            onClick={() => handleUpdateUser()}
                            size="lg"
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
